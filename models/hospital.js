// models/Hospital.js
import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  diagnosticLocation: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hhNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model('Hospital', HospitalSchema);