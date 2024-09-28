import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/dbconfig';
import shortUrl from './routes/shortUrl'
import redisClient from './config/redisConfig';
import './jobs/syncClicks'
dotenv.config();
connectDb();
const port =process.env.port || 5001;

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))

app.use('/api',shortUrl);

app.listen(port,()=>{
    console.log(`Server started on port : ${port}`);
})