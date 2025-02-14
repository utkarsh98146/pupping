import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
export const dbConnect=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection  established successfully to mongoDb..")
    } catch (error) {
        console.log("Connection failed to mongoDB!, Check connection")
    }
}