// models/Patient.js
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  homeAddress: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  phoneNumber: { type: String, required: false },
  hhNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imgHash: { type: [String], required: false },
});

export default mongoose.model('Patient', PatientSchema);