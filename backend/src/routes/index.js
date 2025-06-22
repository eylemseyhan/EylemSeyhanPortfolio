const express = require('express');
const projectRoutes = require('./projectRoutes');
const contactRoutes = require('./contactRoutes');
// Import other routes here in the future

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);
// Use other routes here

module.exports = router;