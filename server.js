const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;


db = async function () {
    try {
        await mongoose.connect(connectionString, {});
        console.log('Connexion à MongoDB réussie !');
    } catch (err) {
        console.error('Erreur:', err);
    }
}

const app = express();
app.use(express.json());

// ADD USER ROUTER
require('./routes/user')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    db();
});