import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

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

//server start
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});


