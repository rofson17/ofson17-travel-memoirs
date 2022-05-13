import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// app config
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// handle routings
app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

// connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`listening to the port ${PORT}`))).catch(err => console.log(err))
