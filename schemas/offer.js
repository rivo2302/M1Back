const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientOfferSchema = new Schema({
  description: String,
  photo: String, // Assuming a URL to the photo
  price: Number
});

module.exports = clientOfferSchema;
