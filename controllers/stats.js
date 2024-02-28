const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const Expense = mongoose.model('Expense');
const Service = mongoose.model('Service');

exports.getReservationsCount = async (req, res) => {
    const { period } = req.query; // 'day' ou 'month'
    const match = {};
    if (period === 'day') {
        match.startDate = { $gte: new Date(), $lt: new Date(new Date().setDate(new Date().getDate() + 1)) };
    } else if (period === 'month') {
        match.startDate = { $gte: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), 1)), $lt: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth() + 1, 0)) };
    }

    try {
        const count = await Appointment.countDocuments(match);
        return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getTurnover = async (req, res) => {
    const { period } = req.query;
    const match = {};
    if (period === 'day') {
        match.startDate = { $gte: new Date(), $lt: new Date(new Date().setDate(new Date().getDate() + 1)) };
    } else if (period === 'month') {
        match.startDate = { $gte: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), 1)), $lt: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth() + 1, 0)) };
    }

    try {
        const appointments = await Appointment.find(match).populate('requestedServices');
        const turnover = appointments.reduce((acc, appointment) => {
            const servicesCost = appointment.requestedServices.reduce((total, service) => total + service.price, 0);
            return acc + servicesCost;
        }, 0);
        return res.status(200).json({ turnover });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getProfit = async (req, res) => {
    const match = {
        startDate: { $gte: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), 1)), $lt: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth() + 1, 0)) },
        
    };

    try {
        const appointments = await Appointment.find(match).populate('requestedServices');
        const turnover = appointments.reduce((acc, appointment) => {
            const servicesCost = appointment.requestedServices.reduce((total, service) => total + service.price, 0);
            return acc + servicesCost;
        }, 0);

        const expenses = await Expense.find(match);
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.price, 0);

        const profit = turnover - totalExpenses;
        return res.status(200).json({ profit });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
