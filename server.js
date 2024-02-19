const express = require('express');
const dotenv = require('dotenv');
const db = require('./utils/db');


dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json());

require('./routes/user')(app);
require('./routes/service')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
