import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URI!);
        console.log("Database connected: ",
            connect.connection.host,
            connect.connection.name
        );
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;