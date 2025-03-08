// routes/hospitalRoutes.js
import express from 'express';
import { getProfile } from '../controllers/hospitalController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected route to fetch hospital profile
router.get('/profile', authMiddleware(['hospital']), getProfile);

export default router;