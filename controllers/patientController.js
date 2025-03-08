import Patient from "../models/patient.js";

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
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Remove the HH number from the permissions list
    patient.permissions = patient.permissions.filter((permission) => permission !== hhNumber);
    await patient.save();

    res.status(200).json({ message: 'Access revoked successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
