import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/dbconfig';
import shortUrl from './routes/shortUrl';
import redisClient from './config/redisConfig';
import syncClicks from './jobs/syncClicks';  // Import the sync job

dotenv.config();
connectDb();
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use('/api', shortUrl);

// Start syncing click counts to MongoDB every minute
syncClicks.start();

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
