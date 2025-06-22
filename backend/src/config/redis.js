const Redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');
require('dotenv').config();

let redisClient = null;
let rateLimiter = null;

if (process.env.REDIS_URL) {
    redisClient = Redis.createClient({
        url: process.env.REDIS_URL,
        socket: {
            connectTimeout: 5000,
            lazyConnect: true,
            reconnectStrategy: (retries) => {
                if (retries > 10) {
                    console.error('Redis connection failed after 10 retries');
                    return false;
                }
                return Math.min(retries * 100, 3000);
            }
        }
    });

    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err.message);
        redisClient = null; // Disable cache if Redis fails
    });

    redisClient.on('connect', () => console.log('Redis connected successfully'));
    redisClient.on('ready', () => console.log('Redis is ready'));

    redisClient.connect().catch(err => {
        console.warn('Redis connection failed on startup:', err.message);
        redisClient = null;
    });

    rateLimiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'contact_form',
        points: 3,
        duration: 60 * 15, // 3 requests per 15 minutes
    });

} else {
    console.warn('Redis URL not found. Rate limiting and caching will be disabled.');
}

module.exports = { redisClient, rateLimiter };