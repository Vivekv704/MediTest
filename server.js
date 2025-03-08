import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import patientRoutes from './routes/patientRoute.js';
import doctorRoutes from './routes/doctorRoute.js';
import hospitalRoutes from './routes/hospitalRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/hospital', hospitalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));