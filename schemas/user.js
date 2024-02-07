const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  photo: String, // Assuming a URL to the photo
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Employee', 'Manager', 'Client'], required: true },
  password: { type: String, required: true },
  favoriteEmployees: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Only for clients
  salary: Number, // Only for employees
  workSchedule: [{ entryDate: Date, exitDate: Date }], // Only for employees
  commissionPercentage: Number // Only for employees
});

module.exports = mongoose.model('User', userSchema);
