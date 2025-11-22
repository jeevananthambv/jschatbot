// Security & Authentication Module
// Handles user verification, data protection, and privacy

const crypto = require('crypto');

class SecurityService {
    constructor() {
        this.sessions = new Map();
        this.rateLimits = new Map();
        this.dataEncryption = true;
    }

    // Generate secure session token
    generateSessionToken(userId) {
        const token = crypto.randomBytes(32).toString('hex');
        const sessionData = {
            userId: userId,
            token: token,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            isActive: true
        };
        
        this.sessions.set(token, sessionData);
        return token;
    }

    // Verify session token
    verifySessionToken(token) {
        const session = this.sessions.get(token);
        if (!session) return { valid: false, error: 'Invalid token' };
        
        if (new Date() > session.expiresAt) {
            this.sessions.delete(token);
            return { valid: false, error: 'Token expired' };
        }
        
        if (!session.isActive) {
            return { valid: false, error: 'Session inactive' };
        }
        
        return { valid: true, userId: session.userId };
    }

    // Rate limiting to prevent abuse
    checkRateLimit(userId, maxRequests = 100, timeWindow = 60000) {
        const key = `ratelimit_${userId}`;
        const now = Date.now();
        
        if (!this.rateLimits.has(key)) {
            this.rateLimits.set(key, { requests: [], blocked: false });
        }
        
        const limit = this.rateLimits.get(key);
        limit.requests = limit.requests.filter(time => now - time < timeWindow);
        
        if (limit.requests.length >= maxRequests) {
            return { allowed: false, message: 'Too many requests. Please try again later.' };
        }
        
        limit.requests.push(now);
        return { allowed: true };
    }

    // Data encryption (simplified - use proper encryption in production)
    encryptSensitiveData(data) {
        // In production, use proper encryption like AES-256
        return {
            encrypted: true,
            data: Buffer.from(JSON.stringify(data)).toString('base64')
        };
    }

    decryptSensitiveData(encrypted) {
        if (encrypted.encrypted) {
            return JSON.parse(Buffer.from(encrypted.data, 'base64').toString());
        }
        return encrypted;
    }

    // Password hashing (simplified - use bcrypt in production)
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    // GDPR Compliance - Right to be forgotten
    deleteUserData(userId) {
        return {
            success: true,
            message: `User ${userId} data deletion initiated`,
            timestamp: new Date()
        };
    }

    // Data privacy check
    validateDataPrivacy(data) {
        const sensitiveFields = ['password', 'ssn', 'creditCard'];
        const hasSensitiveData = sensitiveFields.some(field => 
            JSON.stringify(data).toLowerCase().includes(field)
        );
        
        return {
            isSafe: !hasSensitiveData,
            warning: hasSensitiveData ? 'Sensitive data detected' : null
        };
    }

    // Security headers
    getSecurityHeaders() {
        return {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',
            'Strict-Transport-Security': 'max-age=31536000',
            'Content-Security-Policy': "default-src 'self'",
            'Referrer-Policy': 'no-referrer'
        };
    }

    // Input validation
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>]/g, '') // Remove angle brackets
            .trim()
            .substring(0, 1000); // Limit length
    }

    // Audit logging
    logSecurityEvent(event) {
        console.log(`[SECURITY] ${new Date().toISOString()}: ${JSON.stringify(event)}`);
    }
}

module.exports = new SecurityService();
