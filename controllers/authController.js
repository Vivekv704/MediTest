// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Patient from '../models/patient.js';
import Doctor from '../models/doctor.js';
import Hospital from '../models/hospital.js';

const register = async (req, res) => {
  const { role, ...userData } = req.body;

  try {
    let user;
    switch (role) {
      case 'patient':
        user = new Patient(userData);
        break;
      case 'doctor':
        user = new Doctor(userData);
        break;
      case 'hospital':
        user = new Hospital(userData);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(userData.password, salt);

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
    const { hhNumber, password, role } = req.body;
  
    try {
      let user;
      switch (role) {
        case 'patient':
          user = await Patient.findOne({ hhNumber });
          break;
        case 'doctor':
          user = await Doctor.findOne({ hhNumber });
          break;
        case 'hospital':
          user = await Hospital.findOne({ hhNumber });
          break;
        default:
          return res.status(400).json({ message: 'Invalid role' });
      }
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
          role,
        },
      };
  
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ 
          success: true,
          name: user.name,
          token 
        });
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
export { register, login };