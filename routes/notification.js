const auth = require('../middleware/auth');

module.exports = (app) => {
    const notificationRouter = require('express').Router();
    const notificationController = require('../controllers/notification');

    notificationRouter.get('/', auth(), notificationController.getNotification);

    app.use('/notification', notificationRouter);
}