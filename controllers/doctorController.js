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

export const getPatientReport = async (req, res) => {
  const { id } = req.params; // Patient ID

  try {
    const patient = await Patient.findById(id).select('imgHash');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.imgHash) {
      return res.status(404).json({ message: 'No report found for this patient' });
    }

    // Return the IPFS hash of the report
    res.status(200).json({ imgHash: patient.imgHash });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
