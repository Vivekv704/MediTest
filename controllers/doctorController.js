import Doctor from "../models/doctor.js";

export const getProfile = async (req, res) => {
    try {
      const doctor = await Doctor.findById(req.user.id).select('-password');
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};