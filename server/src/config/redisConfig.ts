import { createClient } from 'redis';

const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19586.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19586
    }
});

redisClient.on('error',(err)=>{
    console.log("Redis connection error: ",err);
})

redisClient.connect().then(()=>{
    console.log("Connected to Redis");
    
})

export default redisClient;