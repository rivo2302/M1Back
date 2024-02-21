const mongoose = require('mongoose');
const config = require("../config/conf");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const maxRetries = 5;
    let retries = 0;
    const connectWithRetry = () => {
      let uri = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}?authSource=admin`;
      console.log('MongoDB connection string:', uri);
      mongoose
        .connect(uri) 
        .then(() => {
          console.log('Database connection successful');
        })
        .catch((err) => {
          console.error('Database connection error:', err);
          if (retries < maxRetries) {
            retries++;
            console.log(`Retrying database connection (Attempt ${retries} of ${maxRetries})...`);
            setTimeout(connectWithRetry, 5000);
          } else {
            console.error('Database connection failed after retries');
          }
        });
    };
    connectWithRetry();
  }
}

module.exports = new Database(); // Export an instance of the Database class
