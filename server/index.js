import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/db.js';
import userRoute from './routes/user.routes.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

const PORT = process.env.PORT || 3000;

// apis================
app.use('/api/v1/user', userRoute);

app.get('/home', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'I am coming from backend'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
