import { initializeApp, cert, getApps } from 'firebase-admin/app'
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
    if (req.method === 'GET') {
        const { id } = req.query
        try {
            const projectDoc = await db.collection('projects').doc(id).get()
            if (!projectDoc.exists) {
                return res.status(404).json({ error: 'Project not found' })
            }
            const project = { id: projectDoc.id, ...projectDoc.data() }
            return res.status(200).json(project)
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch project' })
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}