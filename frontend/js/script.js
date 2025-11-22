// Jeesuva AI Chatbot - Frontend JavaScript
// Cross-device compatible with environment-aware backend URL

class Chatbot {
    constructor() {
        // Smart API URL - automatically detects if running locally or on live site
        const isLocalhost = window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === '';

        // Use localhost for development, cloud URL for production
        this.baseURL = isLocalhost ? 'http://localhost:5000' : 'https://jeesuva-backend.onrender.com';

        console.log(`🌍 Environment: ${isLocalhost ? 'LOCAL' : 'PRODUCTION'}`);
        console.log(`📡 API endpoint: ${this.baseURL}`);

        this.isConnected = false;
        this.isSending = false;
        this.messageQueue = [];
        this.lastStatusCheck = 0;
        this.statusCheckInterval = 30000; // Check every 30 seconds
        this.welcomeShown = false;
        this.errorShown = false;

        console.log('🚀 Initializing chatbot...');

        // Get DOM elements
        this.elements = {
            chatMessages: document.getElementById('chatMessages'),
            messageInput: document.getElementById('messageInput'),
            sendButton: document.getElementById('sendButton'),
            statusDot: document.getElementById('statusDot'),
            statusText: document.getElementById('statusText')
        };

        // Validate essential elements exist
        if (!this.elements.chatMessages || !this.elements.messageInput || !this.elements.sendButton) {
            console.error('❌ CRITICAL: Required DOM elements missing!');
            return;
        }

        this.attachEventListeners();
        this.checkServerStatus();
        this.setupStatusChecks();

        console.log('✅ Chatbot initialized successfully');
    }

    attachEventListeners() {
        // Send button click
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());

        // Enter key to send
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isSending) {
                this.sendMessage();
            }
        });

        // Quick question buttons
        document.querySelectorAll('.quick-question').forEach(button => {
            button.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                if (question && !this.isSending) {
                    this.elements.messageInput.value = question;
                    this.sendMessage();
                }
            });
        });
    }

    setupStatusChecks() {
        setInterval(() => {
            const now = Date.now();
            if (now - this.lastStatusCheck >= this.statusCheckInterval && !this.isConnected) {
                this.checkServerStatus();
            }
        }, this.statusCheckInterval);
    }

    async checkServerStatus() {
        console.log('🔍 Checking server status...');
        this.lastStatusCheck = Date.now();

        try {
            const response = await fetch(`${this.baseURL}/api/test`, {
                method: 'GET'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            console.log('✅ Server online:', data);

            this.setStatus('connected', 'Connected');
            this.isConnected = true;

            if (!this.welcomeShown) {
                this.addMessage('✅ Connected! Ask me about menstrual health, products, or pain management.', 'bot');
                this.welcomeShown = true;
            }
        } catch (error) {
            console.error('❌ Server offline:', error);

            this.setStatus('error', 'Server Offline');
            this.isConnected = false;

            if (!this.errorShown) {
                this.addMessage('⚠️ The chatbot service is currently offline.', 'bot');
                this.addMessage('💡 We\'re working to bring it back online. Please try again later!', 'bot');
                this.errorShown = true;
            }
        }
    }

    setStatus(status, text) {
        if (this.elements.statusDot && this.elements.statusText) {
            this.elements.statusDot.style.background = status === 'connected' ? '#4CAF50' : '#ff4757';
            this.elements.statusText.textContent = text;
        }
    }

    async sendMessage() {
        const message = this.elements.messageInput.value.trim();

        if (!message) return;
        if (this.isSending) return;

        console.log('📤 Sending:', message);

        this.addMessage(message, 'user');
        this.elements.messageInput.value = '';
        this.setLoading(true);
        this.isSending = true;

        if (!this.isConnected) {
            this.addMessage('❌ Cannot connect to server. The chatbot is offline.', 'bot');
            this.setLoading(false);
            this.isSending = false;
            return;
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);

            const response = await fetch(`${this.baseURL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const data = await response.json();
            console.log('✅ Response received:', data);

            if (data.success) {
                this.addMessage(data.reply, 'bot');
            } else {
                this.addMessage('❌ Error: ' + (data.error || 'Unknown error'), 'bot');
            }

        } catch (error) {
            console.error('❌ Error:', error);

            if (error.name === 'AbortError') {
                this.addMessage('❌ Request timed out. Please try again.', 'bot');
            } else {
                this.addMessage('❌ Failed to send message. Check your connection.', 'bot');
                this.isConnected = false;
                this.setStatus('error', 'Connection Failed');
            }
        } finally {
            this.setLoading(false);
            this.isSending = false;
        }
    }

    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        if (typeof text === 'string') {
            contentDiv.innerHTML = text.replace(/\n/g, '<br>');
        } else {
            contentDiv.textContent = text;
        }

        messageDiv.appendChild(contentDiv);
        this.elements.chatMessages.appendChild(messageDiv);
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    setLoading(isLoading) {
        if (!this.elements.sendButton) return;

        if (isLoading) {
            this.elements.sendButton.disabled = true;
            this.elements.sendButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        } else {
            this.elements.sendButton.disabled = false;
            this.elements.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded');

    // Setup chat toggle
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
        });
    }

    if (closeChat && chatWidget) {
        closeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }

    // Initialize chatbot
    try {
        window.chatbot = new Chatbot();
        console.log('✅ Chatbot ready');
    } catch (error) {
        console.error('❌ Chatbot init failed:', error);
    }
});
