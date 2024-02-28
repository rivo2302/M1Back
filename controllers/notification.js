
const appointmentSchema = require('../schemas/appointment');
const offerSchema = require('../schemas/offer');

const Appointment = require('mongoose').model('Appointment', appointmentSchema);
const ClientOffer = require('mongoose').model('Offer', offerSchema);

exports.getNotification = async (req, res) => {
    try {
        const user = req.user
        if (!user) {
            return res.status(404).send('User not found');
        }

        let notifications = [];

        const user_id = user.id;

        if (user.role === 'Client') {
            const offers = await ClientOffer.find({
                "startDate": { "$lte": new Date() },
                "endDate": { "$gte": new Date() }
            });
            const appointments = await Appointment.find({
                client: user_id,
                startDate: { $gte: new Date() }
            }).populate('client');

            notifications = offers.map(offer => ({
                name: "Offres",
                Date: `Jusqu'au ${offer.endDate.toISOString().substring(0, 10)}`,
                Description: offer.description
            })).concat(appointments.map(appointment => ({
                name: "Rendez-vous",
                Date: `Dans ${Math.floor((appointment.startDate.getTime() - new Date().getTime()) / 3600000)} heures`,
                Description: appointment.client?.firstName + ' ' + appointment.client?.lastName
            })));
        }
        else if (user.role === 'Manager') {
            const appointments = await Appointment.find({
                employee: user_id,
                startDate: { $gte: new Date() }
            }).populate('client');

            notifications = appointments.map(appointment => ({
                name: "Tâches",
                Date: `Dans ${Math.floor((appointment.startDate.getTime() - new Date().getTime()) / 3600000)} heures    `,
                Description: appointment.client?.firstName + ' ' + appointment.client?.lastName
            }));
        }

        res.json({ notifications });
    } catch (error) {
        res.status(500).send(error.toString());
    }
};