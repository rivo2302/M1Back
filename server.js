const express = require('express');
const db = require('./utils/db');
const app = express();

db.connect();

app.use(express.json());

require('./routes/user')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});