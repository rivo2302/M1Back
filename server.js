const express = require('express');
const dotenv = require('dotenv');
const db = require('./utils/db');


dotenv.config();
db.connect();

const app = express();
app.use(express.json());

require('./routes/user')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});