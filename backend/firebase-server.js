// Firebase-based Server for Jeesuva
// Simplified, fast, and scalable backend

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Firebase configuration
const { firebaseConfig, validateFirebaseConfig, initializeFirebaseAdmin } = require('./firebase-config');

// Import services
const chatbotService = require('./chatbot-service');
const securityService = require('./security-service');
const GeminiAIService = require('./gemini-ai-service');

// Initialize Gemini AI Service
let geminiAI;
try {
    geminiAI = new GeminiAIService();
    console.log('✅ Gemini AI Service initialized successfully');
} catch (error) {
    console.warn('⚠️ Gemini AI Service failed to initialize:', error.message);
    console.warn('💡 Falling back to rule-based chatbot');
}

// Validate Firebase config on startup
validateFirebaseConfig();

// Initialize Firebase Admin SDK (optional, for future features)
const admin = initializeFirebaseAdmin();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Apply security headers
app.use((req, res, next) => {
    const headers = securityService.getSecurityHeaders();
    Object.entries(headers).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
    next();
});

// Request sanitization middleware
app.use((req, res, next) => {
    if (req.body && req.body.message) {
        req.body.message = securityService.sanitizeInput(req.body.message);
    }
    next();
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'running',
        server: 'Firebase-powered Jeesuva',
        timestamp: new Date().toISOString()
    });
});

// ==================== TEST ENDPOINT ====================
app.get('/api/test', (req, res) => {
    console.log('✅ Test endpoint called');
    res.json({
        message: '🎉 Firebase Server is WORKING!',
        status: 'perfect',
        time: new Date().toLocaleTimeString(),
        powered: 'Firebase + ChatbotService'
    });
});

// ==================== CHAT ENDPOINT ====================
app.post('/api/chat', async (req, res) => {
    try {
        const { message, userId } = req.body;

        // Input validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Message is required and must be a string'
            });
        }

        const trimmedMessage = message.trim();
        if (trimmedMessage === '') {
            return res.status(400).json({
                success: false,
                error: 'Please enter your question about menstrual health'
            });
        }

        // Limit message length
        if (trimmedMessage.length > 1000) {
            return res.status(400).json({
                success: false,
                error: 'Message is too long (max 1000 characters)'
            });
        }

        const userMessage = trimmedMessage.toLowerCase();
        console.log('💬 [Chat] User message:', userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''));

        try {
            // Step 1: Try Gemini AI first
            let reply = null;
            let source = 'rule-based'; // Default source

            if (geminiAI) {
                try {
                    console.log('🤖 [AI] Calling Gemini AI...');
                    const aiResponse = await geminiAI.getResponse(trimmedMessage);

                    if (aiResponse.success && aiResponse.reply) {
                        reply = aiResponse.reply;
                        source = 'gemini-ai';
                        console.log('✅ [AI] Response received from Gemini');
                    } else {
                        throw new Error('AI returned empty response');
                    }
                } catch (aiError) {
                    console.warn('⚠️ [AI] Gemini failed, using fallback:', aiError.message);
                    // Fall through to rule-based system
                }
            }

            // Step 2: If AI didn't work, use rule-based system
            if (!reply) {
                console.log('📚 [Fallback] Using rule-based responses');

                // Analyze emotion for personalization
                let emotionalAnalysis = null;
                try {
                    emotionalAnalysis = chatbotService.analyzeEmotion(message);
                    console.log('📊 [Emotion] Detected:', emotionalAnalysis.emotion);
                } catch (emotionError) {
                    emotionalAnalysis = { emotion: 'unknown', detected: false };
                }

                // Generate response from rule-based system
                reply = chatbotService.generatePersonalizedResponse(userMessage, emotionalAnalysis, null);

                if (!reply || reply.trim() === '') {
                    reply = getFallbackResponse(userMessage);
                }
            }

            // Return successful response
            res.json({
                success: true,
                reply: reply,
                timestamp: new Date().toISOString(),
                source: source // 'gemini-ai' or 'rule-based'
            });

        } catch (innerError) {
            console.error('❌ [Chat] Inner processing error:', innerError.message);
            res.status(500).json({
                success: false,
                error: 'Error processing your message. Please try again.'
            });
        }

    } catch (error) {
        console.error('❌ [Chat] Endpoint error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Server error. Please try again later.'
        });
    }
});

// ==================== EMOTION ENDPOINT ====================
app.post('/api/emotion', (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'No message provided'
            });
        }

        const analysis = chatbotService.analyzeEmotion(message);

        res.json({
            success: true,
            emotion: analysis.emotion,
            intensity: analysis.intensity,
            confidence: analysis.confidence,
            detected: analysis.detected
        });

    } catch (error) {
        console.error('❌ Emotion analysis error:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error analyzing emotion'
        });
    }
});

// ==================== INFO ENDPOINT ====================
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Jeesuva',
        version: '2.0-Firebase',
        description: 'Menstrual health companion powered by Firebase',
        features: [
            'Emotion detection with intensity levels',
            'Personalized responses',
            'Conversation tracking',
            'Lightning-fast responses',
            'Firebase scalability'
        ],
        endpoints: {
            chat: 'POST /api/chat',
            emotion: 'POST /api/emotion',
            health: 'GET /api/health',
            test: 'GET /api/test',
            info: 'GET /api/info'
        }
    });
});

// ==================== SERVE FRONTEND ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ==================== ERROR HANDLING ====================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        available: ['/api/chat', '/api/emotion', '/api/health', '/api/test', '/api/info']
    });
});

// ==================== FALLBACK RESPONSE ====================
function getFallbackResponse(userMessage) {
    const fallbackResponses = {
        pain: "I'm truly sorry you're experiencing pain. Please try:\n1. Use Jeesuva Heating Pad\n2. Take our Herbal Sachet\n3. Rest and stay hydrated\n4. See a doctor if it persists",
        period: "Your period is a natural process. You deserve care and comfort. Use Jeesuva products for relief!",
        cycle: "Your menstrual cycle is unique to you. Track patterns and listen to your body.",
        help: "I'm here to help with any questions about menstrual health. What would you like to know?",
        default: "I'm here to support you with menstrual health information. Feel free to ask anything! 💙"
    };

    for (const [keyword, response] of Object.entries(fallbackResponses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }

    return fallbackResponses.default;
}

// ==================== START SERVER ====================
// Only start server if not running in Vercel (Vercel uses serverless)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log('\n' + '='.repeat(70));
        console.log('🚀 JEESUVA FIREBASE SERVER - PRODUCTION READY');
        console.log('='.repeat(70));
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`📡 Firebase Project: jeesuva-cb878`);
        console.log(`⚡ Powered by: Express + ChatbotService + Firebase`);
        console.log(`🔒 Security: Headers + Input Sanitization`);
        console.log('='.repeat(70));
        console.log('Available Endpoints:');
        console.log('  POST /api/chat       - Chat with Jeesuva');
        console.log('  POST /api/emotion    - Analyze emotions');
        console.log('  GET  /api/health     - Health check');
        console.log('  GET  /api/test       - Test endpoint');
        console.log('  GET  /api/info       - API information');
        console.log('='.repeat(70) + '\n');
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Server shutting down gracefully...');
        process.exit(0);
    });
}

// Root route for friendly welcome
app.get('/', (req, res) => {
    res.status(200).json({
        message: '🚀 Jeesuva Backend is Running!',
        status: 'online',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/api/health',
            test: '/api/test',
            chat: '/api/chat (POST)'
        }
    });
});

// Export for Vercel serverless
module.exports = app;
