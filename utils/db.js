const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const maxRetries = 5;
    let retries = 0;
    const connectWithRetry = () => {
      mongoose
        .connect('mongodb://mongo_db:27017/backend', {})
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
