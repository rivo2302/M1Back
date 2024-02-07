const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  status: { type: String, enum: ['InProgress', 'Finished', 'Ready'], required: true },
  requestedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  employee: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
