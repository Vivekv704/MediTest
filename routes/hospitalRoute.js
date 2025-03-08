// routes/hospitalRoutes.js
import express from 'express';
import { getProfile } from '../controllers/hospitalController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getPatientReport } from '../controllers/doctorController.js';
import { checkAccessMiddleware } from '../middleware/checkAccessMiddleware.js';

const router = express.Router();

// Protected route to fetch hospital profile
router.get('/profile', authMiddleware(['hospital']), getProfile);

// Fetch patient report (accessible only if permission is granted)
router.get('/patient/:id/report', authMiddleware(['doctor']), getPatientReport, checkAccessMiddleware);

export default router;