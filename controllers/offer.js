const mongoose = require('mongoose');
const serivceSchema = require('../schemas/offer');

const Offer = mongoose.model('Offer', serivceSchema);

exports.createOffer = async (req, res) => {
    const offer = new Offer();
    for (let key in req.body) {
        offer[key] = req.body[key];
    }
    try {
        const newOffer = await offer.save();
        res.status(201).send(newOffer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllOffer = async (req, res) => {
    try {
        var offers = await Offer.find();
        res.status(200).send(offers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getOfferById = async (req, res) => {
    try {
        var offer = await Offer.findById(req.params.id);
        res.status(200).send(offer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.updateOffer = async (req, res) => {
    try {
        var offer = await Offer.findById(req.params.id);
        for (let key in req.body) {
            offer[key] = req.body[key];
        }
        var updatedOffer = await offer.save();
        res.status(200).send(updatedOffer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteOffer = async (req, res) => {
    try {
        var deletedOffer = await Offer.deleteOne({ _id: req.params.id });
        res.status(200).send(deletedOffer);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}