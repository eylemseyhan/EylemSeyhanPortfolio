const admin = require('firebase-admin');

try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
        throw new Error('Firebase credentials not set in environment variables');
    }

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey
        })
    });
    console.log('Firebase Admin SDK initialized successfully.');

} catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error.message);
    // In a modular structure, we might want to handle this more gracefully,
    // but for now, logging the error is sufficient.
}

const db = admin.firestore();

// Firestore settings
db.settings({
    ignoreUndefinedProperties: true,
    timeoutSeconds: 30
});

module.exports = { admin, db };