const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('../schemas/user');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User', userSchema);
const config = require('../config/conf');


// Signup a new user
exports.signupUser = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else {
            const user = new User();
            for (let key in req.body) {
                if (key !== 'password') {
                    user[key] = req.body[key];
                }
            }
            user.password = hash;
            try {
                const newUser = await user.save();
                res.status(201).send(newUser);
            } catch (error) {
                res.status(500).send({ message: error.message });
            }
        }
    });
}

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(401).send({ message: 'Error Authentication failed', err: err });
                } else if (result) {
                    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: '24h' });
                    return res.status(200).send({ message: 'Authentication successful', token: token, user: user });
                } else {
                    res.status(401).send({ message: '401 Authentication failed' });
                }
            });
        } else {
            res.status(401).send({ message: 'Authentication failed for this user' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        if (req.query.role) {
            let role = req.query.role.charAt(0).toUpperCase() + req.query.role.slice(1);
            var users = await User.find({
                role: role
            }).select(req.fields);
        }
        else {
            var users = await User.find().select(req.fields);
        };
        res.status(200).send(users);
    } catch (error) {
        res
            .status(500)
            .send({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(req.fields);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}