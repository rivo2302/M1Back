const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  photo: String,  
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Employee', 'Manager', 'Client'], required: true },
  password: { type: String, required: true },
  favoriteEmployees: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Only for clients
  salary: Number, // Only for employees
  workSchedule: {type: String}, // Only for employee"
});

module.exports = userSchema;
