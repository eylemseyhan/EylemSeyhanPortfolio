const app = require('./src/app');
const { db } = require('./src/config/firebase');
const { redisClient } = require('./src/config/redis');
const port = process.env.PORT || 3000;

// Cache warming function
async function warmProjectsCache() {
    if (!redisClient) {
        console.log('Redis not available, skipping cache warming');
        return;
    }

    try {
        console.log('Warming up projects cache...');
        const cacheKey = 'projects:all';

        const projectsSnapshot = await db.collection('projects')
            .orderBy('order', 'asc')
            .select('title', 'description', 'coverImageUrl', 'technologies', 'githubUrl', 'liveUrl', 'order')
            .get();

        if (!projectsSnapshot.empty) {
            const projects = projectsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            await redisClient.setEx(cacheKey, 1800, JSON.stringify(projects)); // 30 dakika cache
            console.log(`✅ Projects cache warmed up! ${projects.length} projects cached`);
        } else {
            console.log('No projects found to cache');
        }
    } catch (error) {
        console.error('❌ Cache warming failed:', error.message);
    }
}

app.listen(port, async() => {
    console.log(`Server running on port ${port}`);

    // Warm up cache on server start
    await warmProjectsCache();
});