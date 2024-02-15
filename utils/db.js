const mongoose = require('mongoose');
const config = require('../config/conf');

class Datatabase {
    constructor() {
        {
            this.connectionString = `mongodb://localhost:27017/backend`;
        }
    }
    async connect() {
        try {
            await mongoose.connect(this.connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Mongos DB connected', config);
        } catch (err) {
            console.error('Error:', err);
        }
    }
}


module.exports = new Datatabase();