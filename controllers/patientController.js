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

