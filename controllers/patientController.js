import Patient from "../models/patient.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const getProfile = async (req, res) => {
    try {
      const patient = await Patient.findById(req.user.id).select('-password');
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json(patient);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await Patient.findByIdAndUpdate
        (req.user.id, req.body, { new: true, runValidators: true });
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


// Grant access to a doctor
export const grantAccess = async (req, res) => {
  const { hhNumber } = req.body; // HH number of the doctor/hospital

  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Initialize permissions if it is undefined
    if (!patient.permissions) {
      patient.permissions = [];
    }

    // Check if the HH number is already in the permissions list
    if (patient.permissions.includes(hhNumber)) {
      return res.status(400).json({ message: 'Access already granted' });
    }

    // Add the HH number to the permissions list
    patient.permissions.push(hhNumber);
    await patient.save();

    res.status(200).json({ message: 'Access granted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Revoke access from a doctor/hospital
export const revokeAccess = async (req, res) => {
  const { hhNumber } = req.body; // HH number of the doctor/hospital

  try {
    if(!hhNumber) {
      return res.status(400).json({ message: 'HH number is required' });
    }
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if the HH number is in the permissions list
    if (!patient.permissions.includes(hhNumber)) {
      return res.status(400).json({ message: 'Access not found' });
    }

    // Remove the HH number from the permissions list
    patient.permissions = patient.permissions.filter((permission) => permission !== hhNumber);
    await patient.save();

    res.status(200).json({ message: 'Access revoked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadReport = async (req, res) => {
  try {
      const { imgHash } = req.body;
      const patientId = req.user.id;

      if (!imgHash) {
          return res.status(400).json({ message: 'imgHash is required' });
      }

      const patient = await Patient.findById(patientId);
      if (!patient) {
          return res.status(404).json({ message: 'Patient not found' });
      }

      // Push new imgHash to the existing array
      patient.imgHash.push(imgHash);
      await patient.save();

      res.status(200).json({ message: 'imgHash added successfully', patient });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};