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
const uri = process.env.MONGO_URI ;
mongoose
  .connect(uri)
  .then(() => console.log('✅ MongoDB connected to', uri))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/api/loans', loanRoutes);

export default app;
