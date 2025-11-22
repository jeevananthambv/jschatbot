// Firebase Configuration
// Centralized configuration for all Firebase services

const firebaseConfig = {
  apiKey: "AIzaSyB78gNls7m1UuWB1urKfTh-IsSy5Lv0pV0",
  authDomain: "jeesuva-cb878.firebaseapp.com",
  projectId: "jeesuva-cb878",
  storageBucket: "jeesuva-cb878.firebasestorage.app",
  messagingSenderId: "476652875026",
  appId: "1:476652875026:web:3685a1f5ef0719551757cb",
  measurementId: "G-5Z68V6JPCK"
};

// Validate Firebase configuration
function validateFirebaseConfig() {
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);
  
  if (missingKeys.length > 0) {
    console.warn('⚠️ Missing Firebase config keys:', missingKeys);
    return false;
  }
  
  console.log('✅ Firebase configuration validated');
  return true;
}

// Initialize Firebase Admin SDK (if service account is available)
function initializeFirebaseAdmin() {
  try {
    const admin = require('firebase-admin');
    
    // Check if Firebase is already initialized
    if (!admin.apps || admin.apps.length === 0) {
      // Using default credentials from environment
      admin.initializeApp({
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket
      });
      console.log('✅ Firebase Admin SDK initialized');
    }
    
    return admin;
  } catch (error) {
    console.warn('⚠️ Firebase Admin SDK not available:', error.message);
    console.log('   (This is OK for development without service account)');
    return null;
  }
}

// Export configuration and utilities
module.exports = {
  firebaseConfig,
  validateFirebaseConfig,
  initializeFirebaseAdmin,
  
  // Helper function to get config value
  getConfig: (key) => firebaseConfig[key],
  
  // Helper function to get all config
  getAllConfig: () => ({ ...firebaseConfig })
};
