import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "./routes/auth.js";
dotenv.config({path: './.env'});
import connectToDatabase from "./db/db.js";
import verifyTokenMiddleware from './middleware/verfyTokenMiddleware.js';
import functionalitiesRouter from './routes/functionalities.js';
import setupSwagger from './swagger/swagger.js';

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());

// For swagger
setupSwagger(app);

app.use('/api/auth',authRouter);

// Custom middleware
// app.use(verifyTokenMiddleware);
// Protected routes 
app.use('/api/data',functionalitiesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
    
})