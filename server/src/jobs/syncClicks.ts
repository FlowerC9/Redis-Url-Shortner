import cron from 'node-cron';
import { urlModel } from '../models/shortUrl';
import redisClient from '../config/redisConfig';

// Sync Redis click counts with MongoDB every minute
const syncClicks = cron.schedule('0 * * * *', async () => {
    console.log('Syncing clicks to MongoDB...');
    
    try {
        // Get all keys that track clicks (e.g., clicks:{shortUrlId})
        const keys = await redisClient.keys('clicks:*');

        for (const key of keys) {
            const shortUrlId = key.split(':')[1];  // Extract short URL ID from the key
            const clicks = await redisClient.get(key);  // Get the click count from Redis

            // Update the click count in MongoDB if the key exists in Redis
            if (clicks) {
                await urlModel.findOneAndUpdate(
                    { shortUrl: shortUrlId },
                    { clicks: parseInt(clicks) }
                );

                // Optionally, delete the Redis key after syncing to MongoDB
                await redisClient.del(key);
            }
        }

        console.log('Sync complete.');
    } catch (error) {
        console.error('Error syncing clicks:', error);
    }
});

export default syncClicks;
