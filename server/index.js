import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth_routes.js';
import postRoutes from './routes/post_routes.js';

//env file config
dotenv.config();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB server successfully');
});

//configure express app and socket.io
const app = express();
app.use(cors());


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//api routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

//server start
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});


