const mongoose = require('mongoose');
const config = require('../config/conf');

class Datatabase {
    constructor() {
        {
            this.connectionString = `mongodb://mongodb:27017/backend`;
            console.log('this.connectionString', this.connectionString);
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