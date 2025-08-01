import {
    initializeApp,
    applicationDefault,
    cert,
    getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

const db = getFirestore();

export default async function handler(req, res) {
    if (req.method === "GET") {
        // Tekil proje mi, tüm projeler mi?
        const { id } = req.query;
        if (id) {
            // getProjectById
            try {
                const projectDoc = await db.collection("projects").doc(id).get();
                if (!projectDoc.exists) {
                    return res.status(404).json({ error: "Project not found" });
                }
                const project = { id: projectDoc.id, ...projectDoc.data() };
                return res.status(200).json(project);
            } catch (error) {
                return res.status(500).json({ error: "Failed to fetch project" });
            }
        } else {
            // getProjects
            try {
                const projectsSnapshot = await db
                    .collection("projects")
                    .orderBy("order", "asc")
                    .get();
                if (projectsSnapshot.empty) {
                    return res.status(404).json({ error: "No projects found" });
                }
                const projects = projectsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return res.status(200).json(projects);
            } catch (error) {
                return res.status(500).json({ error: "Failed to fetch projects" });
            }
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}