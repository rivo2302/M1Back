const mongoose = require('mongoose');
const config = require('../config/conf');

class Datatabase {
    constructor() {
        {
            this.connectionString = `mongodb://mongo_db:/${config.DB_NAME}`;
        }
    }
    async connect() {
        try {
            await mongoose.connect(this.connectionString, {});
            console.log('Mongos DB connected' , config);
        } catch (err) {
            console.error('Error:', err);
        }
    }
}


module.exports = new Datatabase();