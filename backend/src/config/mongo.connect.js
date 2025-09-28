import mongoose from "mongoose";
import "dotenv/config"

export const connectDB=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("db connect successfully")
        
    } catch (error) {
        console.log("error in connecting  db",error)
        process.exit(1)
        
    }
}