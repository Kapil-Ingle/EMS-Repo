import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: './.env'})

const connectToDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_LOCAL_URL);
        console.log('DB connected!');
    }catch(error){
        console.log(error);
    }
}

export default connectToDatabase