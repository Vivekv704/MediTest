import express from 'express';
import { getProfile } from '../controllers/patientController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { grantAccess, revokeAccess } from '../controllers/patientController.js';

const router = express.Router();

// Protected route to fetch patient profile
router.get('/profile', authMiddleware(['patient']), getProfile);

// Grant access to a doctor/hospital
router.post('/grant-access', authMiddleware(['patient']), grantAccess);

// Revoke access from a doctor/hospital
router.post('/revoke-access', authMiddleware(['patient']), revokeAccess);

export default router;