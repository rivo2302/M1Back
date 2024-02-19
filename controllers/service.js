const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const serivceSchema = require('../schemas/service');
const jwt = require('jsonwebtoken');``

const Service = mongoose.model('Service', serivceSchema);
const config = require('../config/conf');

exports.createService = async (req, res) => {
    const service = new Service();
    for (let key in req.body) {
        service[key] = req.body[key];
    }
    try {
        const newService = await service.save();
        res.status(201).send(newService);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllService = async (req, res) => {
    try {
        var services = await Service.find();
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getServiceById = async (req, res) => {
    try {
        var service = await Service.findById(req.params.id);
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateService = async (req, res) => {
    try {
        var service = await Service.findById(req.params.id);
        for (let key in req.body) {
            service[key] = req.body[key];
        }
        var updatedService = await service.save();
        res.status(200).send(updatedService);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}