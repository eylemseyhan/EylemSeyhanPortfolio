import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
}

if (!getApps().length) {
    initializeApp(firebaseConfig)
}

const db = getFirestore()

export default async function handler(req, res) {
    try {
        const snapshot = await db.collection('projects').get()
        const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}