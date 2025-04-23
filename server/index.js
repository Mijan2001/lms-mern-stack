import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/db.js';
import userRoute from './routes/user.routes.js';

import courseRoute from './routes/course.route.js';

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

const PORT = process.env.PORT || 3000;

// apis================
app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);

app.get('/home', (_, res) => {
    res.status(200).json({
        success: true,
        message: 'I am coming from backend'
    });
});

// Catch-all route for handling 404 Not Found=============
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error); // pass the error to the error-handling middleware
});

// Error-handling middleware===============================
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
