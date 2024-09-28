import cron from 'node-cron'
import { urlModel } from '../models/shortUrl';  // Import your URL model
import redisClient from '../config/redisConfig';  // Import your Redis client

// This job will run every hour to sync click counts from Redis to MongoDB
cron.schedule('0 * * * *', async () => {
    console.log('Starting click count sync with database...');

    try {
        // Fetch all URLs from the database
        const allUrls = await urlModel.find();

        for (const url of allUrls) {
            const clickCountKey = `clicks:${url.shortUrl}`; // Redis key for storing clicks
            const cachedClicks = await redisClient.get(clickCountKey);

            if (cachedClicks) {
                // Update the clicks count in MongoDB
                url.clicks += parseInt(cachedClicks);
                await url.save();

                // Reset the click count in Redis after syncing
                await redisClient.del(clickCountKey);
            }
        }

        console.log('Click counts successfully synced with database.');
    } catch (error) {
        console.error('Error syncing click counts with database:', error);
    }
});
