const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['InProgress', 'Finished', 'Ready'], required: true },
  requestedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' ,required: true }],
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  employee: { type: Schema.Types.ObjectId, ref: 'User'  ,required: true }
});

module.exports = appointmentSchema;
