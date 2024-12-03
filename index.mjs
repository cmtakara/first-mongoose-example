import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import db from './db/conn.mjs';

const PORT = process.env.PORT || 5052;

const app = express();

app.use(express.json());

// start express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})