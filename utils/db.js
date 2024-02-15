const mongoose = require('mongoose');
const config = require('../config/conf');

class Datatabase {
    constructor() {
        {
            this.connectionString = `mongodb://mongo_db:27017/backend`;
        }
    }
    async connect() {
        try {
            await mongoose.connect(this.connectionString, {});
            console.log('Mongos DB connected', config);
        } catch (err) {
            console.error('Error:', err);
        }
    }
}


module.exports = new Datatabase();