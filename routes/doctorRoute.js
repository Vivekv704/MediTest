// routes/doctorRoutes.js
import express from 'express';
import { getProfile } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to fetch doctor profile
router.get('/profile', authMiddleware(['doctor']), getProfile);

export default router;