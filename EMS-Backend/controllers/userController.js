import bcrypt from "bcrypt"
import connectToDatabase from "../db/db.js";
import User from "../models/User.js";

const createUser = async (req, res) => {
    connectToDatabase();
    try{
        const hashedPassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'Kapil Ingle',
            email: 'codingkapil@gmail.com',
            password: hashedPassword,
            role: 'admin'
        })
        await newUser.save();
    }catch(error){
        console.log(error);
        
    }
}

createUser();