// routes/doctorRoutes.js
import express from 'express';
import { getPatientReport, getProfile } from '../controllers/doctorController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { checkAccessMiddleware } from '../middleware/checkAccessMiddleware.js';

const router = express.Router();

// Protected route to fetch doctor profile
router.get('/profile', authMiddleware(['doctor']), getProfile);
// Fetch patient report (accessible only if permission is granted)
router.get('/patient/:id/report', authMiddleware(['doctor']), checkAccessMiddleware, getPatientReport);

export default router;