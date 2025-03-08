import Hospital from '../models/hospital.js';

export const getProfile = async (req, res) => {
    try {
      const hospital = await Hospital.findById(req.user.id).select('-password');
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
      res.status(200).json(hospital);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  