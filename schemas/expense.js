const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: String,
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
  price: Number,
  name: String
});

module.exports = mongoose.model('Expense', expenseSchema);
