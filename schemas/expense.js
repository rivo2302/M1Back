const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: String,
  price: Number,
  name: String
});

module.exports = expenseSchema;
