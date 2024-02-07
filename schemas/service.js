const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  processingTime: Number // Assuming this is in minutes or hours
});

module.exports = mongoose.model('Service', serviceSchema);
