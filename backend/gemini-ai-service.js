const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class GeminiAIService {
    constructor() {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('❌ GEMINI_API_KEY not found in environment variables');
        }

        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

        // System context about Jeesuva and menstrual health
        this.systemContext = `You are Jeesuva AI Assistant, an expert menstrual health chatbot for a social enterprise called Jeesuva. 

ABOUT JEESUVA:
- We provide affordable, eco-friendly menstrual pain relief solutions
- Our main products: reusable heating pads (no electricity needed) and herbal sachets
- Mission: Make menstrual health accessible globally, especially in India and Africa
- We work with schools, NGOs, and communities to reduce period poverty

YOUR EXPERTISE:
- Menstrual health education (pain management, hygiene, nutrition, mental wellness)
- PCOS, Endometriosis, and other menstrual conditions
- Period poverty and stigma reduction
- Age-appropriate guidance (puberty, teens, adults)
- Cultural sensitivity (myths vs facts from India, Africa, Asia)
- Emergency situations and when to see a doctor

YOUR TONE:
- Warm, empathetic, and supportive
- Evidence-based and medically accurate
- Empowering and stigma-free
- Age-appropriate language
- Use emojis moderately for friendliness

JEESUVA PRODUCTS (mention when relevant):
1. **Heating Pad**: Reusable, click-activated, 4-6 hours warmth, no electricity, 100+ uses
2. **Herbal Sachets**: Ajwain, ginger, jaggery for pain relief and iron replenishment

Answer questions about menstrual health, our products, period care, and related topics. Be concise but informative. If asked about non-menstrual topics, politely redirect to menstrual health.`;

        console.log('✅ Gemini AI Service initialized');
    }

    async getResponse(userMessage, conversationHistory = []) {
        try {
            console.log('🤖 Gemini AI processing:', userMessage);

            // Build conversation context
            let prompt = this.systemContext + '\n\n';

            // Add conversation history if exists
            if (conversationHistory.length > 0) {
                prompt += 'CONVERSATION HISTORY:\n';
                conversationHistory.forEach(msg => {
                    prompt += `${msg.role}: ${msg.content}\n`;
                });
                prompt += '\n';
            }

            prompt += `USER: ${userMessage}\n\nASSISTANT:`;

            // Call Gemini API
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            console.log('✅ Gemini AI response received');

            return {
                success: true,
                reply: text,
                source: 'gemini-ai'
            };

        } catch (error) {
            console.error('❌ Gemini AI Error:', error.message);

            // Fallback response
            return {
                success: false,
                reply: "I'm having trouble connecting to my AI brain right now. Please try again in a moment, or ask me about specific topics like pain management, PCOS, cycle tracking, or our Jeesuva products! 💕",
                error: error.message,
                source: 'error-fallback'
            };
        }
    }

    // Helper method to format response with structure (optional)
    formatResponse(text) {
        // If the response already has HTML structure, return as is
        if (text.includes('<div class="bot-response">')) {
            return text;
        }

        // Otherwise wrap in a simple structure
        return `<div class="bot-response">
<div class="response-content">${text}</div>
</div>`;
    }
}

module.exports = GeminiAIService;
