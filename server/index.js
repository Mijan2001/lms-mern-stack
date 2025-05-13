import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './database/db.js';
import userRoute from './routes/user.routes.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import courseProgressRoute from './routes/courseProgress.route.js';
dotenv.config();

connectDB();

const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(
    cors({
        origin: 'https://lms-mern-stack-ru3i.vercel.app',
        credentials: true
    })
);

const PORT = process.env.PORT || 3000;

// apis================
app.use('/api/v1/media', mediaRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/purchase', purchaseRoute);
app.use('/api/v1/progress', courseProgressRoute);

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
    if (err.name === 'CORSError') {
        return res.status(403).json({
            success: false,
            message: 'CORS error: Not allowed to access this resource'
        });
    }
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
