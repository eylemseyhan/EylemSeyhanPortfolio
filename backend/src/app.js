const express = require('express')
const cors = require('cors')
const compression = require('compression')
require('dotenv').config()

// Initialize configurations
require('./config/firebase');
require('./config/redis');

const mainRouter = require('./routes');

const app = express()

// CORS settings
const allowedOriginsFromEnv = process.env.CORS_ALLOWED_ORIGINS || '';
const allowedOrigins = allowedOriginsFromEnv.split(',').map(origin => origin.trim()).filter(Boolean);

if (allowedOrigins.length === 0) {
    console.warn(
        'WARNING: CORS_ALLOWED_ORIGINS is not set in .env file. ' +
        'No external origins will be allowed. This is not suitable for production.'
    );
}

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in the configured allowed list.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin '${origin}' not allowed by CORS`));
        }
    },
    optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions))
app.use(compression())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Backend is running!</h1>");
})

// Main API routes
app.use('/api', mainRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;