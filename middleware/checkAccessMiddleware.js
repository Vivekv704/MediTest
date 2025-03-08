import Patient from '../models/patient.js';

export const checkAccessMiddleware = async (req, res, next) => {
    const { id } = req.params; // Patient ID
    const { hhNumber } = req.user; // HH number of the doctor/hospital
  
    try {
      const patient = await Patient.findById(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      // Check if the doctor/hospital has access
      if (!patient.permissions.includes(hhNumber)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };