import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js";
dotenv.config({path: './.env'});
import connectToDatabase from "./db/db.js";

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
    
})