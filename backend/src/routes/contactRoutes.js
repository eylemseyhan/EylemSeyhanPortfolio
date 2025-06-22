const express = require('express');
const { handleContactForm } = require('../controllers/contactController');
const { rateLimiterMiddleware } = require('../middleware/rateLimiterMiddleware');

const router = express.Router();

// Apply the rate limiter only to the contact form submission route
router.post('/', rateLimiterMiddleware, handleContactForm);

module.exports = router;