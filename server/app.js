import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRouter from './routes/posts.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// app config
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// handle routings
app.use('/posts', postsRouter);

// connect to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`listening to the port ${PORT}`))).catch(err => console.log(err))
