const mongoose = require('mongoose');
const config = require('../config/conf');

class Datatabase {
    constructor() {
        {
            this.connectionString = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
        }
    }
    async connect() {
        try {
            await mongoose.connect(this.connectionString, {});
            console.log('Mongo DB connected');
        } catch (err) {
            console.error('Error:', err);
        }
    }
}


module.exports = new Datatabase();