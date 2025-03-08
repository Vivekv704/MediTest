import express from 'express';
import { getProfile } from '../controllers/patientController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to fetch patient profile
router.get('/profile', authMiddleware(['patient']), getProfile);

export default router;