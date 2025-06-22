const { db } = require('../config/firebase');
const { redisClient } = require('../config/redis');

const getProjects = async(req, res) => {
    try {
        const cacheKey = 'projects:all';

        if (redisClient) {
            const cachedProjects = await redisClient.get(cacheKey);
            if (cachedProjects) {
                console.log('Projects served from cache');
                return res.json(JSON.parse(cachedProjects));
            }
        }

        const projectsSnapshot = await db.collection('projects')
            .orderBy('order', 'asc')
            .select('title', 'description', 'coverImageUrl', 'technologies', 'githubUrl', 'liveUrl', 'order')
            .get();

        if (projectsSnapshot.empty) {
            return res.status(404).json({ error: 'No projects found' });
        }

        const projects = projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        if (redisClient) {
            await redisClient.setEx(cacheKey, 300, JSON.stringify(projects)); // 5 min cache
        }

        console.log(`Projects loaded: ${projects.length} projects`);
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

const getProjectById = async(req, res) => {
    try {
        const projectId = req.params.id;
        const cacheKey = `project:${projectId}`;

        if (redisClient) {
            const cachedProject = await redisClient.get(cacheKey);
            if (cachedProject) {
                console.log(`Project ${projectId} served from cache`);
                return res.json(JSON.parse(cachedProject));
            }
        }

        const projectDoc = await db.collection('projects').doc(projectId).get();

        if (!projectDoc.exists) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = { id: projectDoc.id, ...projectDoc.data() };

        if (redisClient) {
            await redisClient.setEx(cacheKey, 600, JSON.stringify(project)); // 10 min cache
        }

        res.json(project);
    } catch (error) {
        console.error('Error fetching single project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};

module.exports = {
    getProjects,
    getProjectById
};