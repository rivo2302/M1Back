const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientOfferSchema = new Schema({
  description: String,
  price: Number,
  startDate: { type: Date , required: true },
  endDate: { type: Date  , required: true },
});

module.exports = clientOfferSchema;
