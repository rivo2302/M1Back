const mongoose = require('mongoose');
const serivceSchema = require('../schemas/service');

const Service = mongoose.model('Service', serivceSchema);

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

exports.deleteService = async (req, res) => {
    try {
        var deletedService = await Service.deleteOne({ _id: req.params.id });
        res.status(200).send(deletedService);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}