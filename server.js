const express = require('express');
const db = require('./utils/db');


db.connect();

const app = express();
app.use(express.json());

require('./routes/user')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});