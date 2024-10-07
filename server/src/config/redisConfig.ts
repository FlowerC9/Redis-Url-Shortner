import { createClient } from 'redis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const redisClient = createClient({
    password: process.env.REDIS_PASS,  // Redis password from env
    socket: {
        host: process.env.REDIS_HOST || 'redis-19586.c305.ap-south-1-1.ec2.redns.redis-cloud.com',  // Redis host
        port: parseInt(process.env.REDIS_PORT || '19586'),  // Redis port
    }
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Connect to Redis and handle the promise
redisClient.connect().then(() => {
    console.log('Connected to Redis');
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

export default redisClient;
