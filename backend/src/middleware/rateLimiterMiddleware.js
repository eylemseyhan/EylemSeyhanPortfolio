const { rateLimiter } = require('../config/redis');

const rateLimiterMiddleware = async(req, res, next) => {
    if (!rateLimiter) {
        // If rate limiter is not configured, just proceed.
        return next();
    }
    try {
        await rateLimiter.consume(req.ip);
        next();
    } catch (rejRes) {
        res.status(429).json({
            error: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
            retryAfter: Math.round(rejRes.msBeforeNext / 1000)
        });
    }
};

module.exports = { rateLimiterMiddleware };