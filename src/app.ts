// src/app.ts
import 'dotenv/config';              // <-- this line loads .env into process.env
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import loanRoutes from './routes/loanRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// Use your MONGO_URI from .env, or still fallback if you like
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error('MONGO_URI environment variable is not defined');
}
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/loans', loanRoutes);

export default app;
