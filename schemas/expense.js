const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: String,
  price: {type : Number , required : true },
  name:  {type : String , required : true },
});

module.exports = expenseSchema;
