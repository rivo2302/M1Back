// Connect to the mongoDB database
const mongoose = require('mongoose');

// Get the connection string from the environment
const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_PORT}`;


