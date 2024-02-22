const mongoose = require('mongoose');

const appointmentSchema = require('../schemas/appointment');
const Appointment = mongoose.model('Appointment', appointmentSchema);

exports.createAppointment = async (req, res) => {
    const appointment = new Appointment();
    for (let key in req.body) {
        appointment[key] = req.body[key];
    }
    try {
        const newAppointment = await appointment.save();
        res.status(201).send(newAppointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllAppointment = async (req, res) => {
    try {
        var appointments = await Appointment.
            find()
            .populate('requestedServices')
            .populate('client')
            .populate('employee')

        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAppointmentById = async (req, res) => {
    try {
        var appointment = await Appointment.findById(req.params.id).populate('requestedServices')
            .populate('client')
            .populate('employee');
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


exports.updateAppointment = async (req, res) => {
    try {
        var appointment = await Appointment.findById(req.params.id);
        for (let key in req.body) {
            appointment[key] = req.body[key];
        }
        var updatedAppointment = await appointment.save();
        res.status(200).send(updatedAppointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        var appointment = await Appointment.findById(req.params.id);
        var deletedAppointment = await appointment.remove();
        res.status(200).send(deletedAppointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

