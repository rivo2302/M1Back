const auth = require('../middleware/auth');

module.exports = (app) => {

    const appointmentRouter = require('express').Router();
    const appointmentController = require('../controllers/appointment');

    appointmentRouter.post('/', auth(), appointmentController.createAppointment);
    appointmentRouter.get('/', auth(), appointmentController.getAllAppointment);
    appointmentRouter.get('/:id', auth(), appointmentController.getAppointmentById);
    appointmentRouter.put('/:id', auth(), appointmentController.updateAppointment);
    appointmentRouter.delete('/:id', auth(), appointmentController.deleteAppointment);

    app.use('/appointment', appointmentRouter);
}
