const auth = require('../middleware/auth');

module.exports = (app) => {
    const serviceRouter = require('express').Router();
    const serviceController = require('../controllers/service');

    serviceRouter.post('/', auth(), serviceController.createService);
    serviceRouter.get('/', auth(), serviceController.getAllService);
    serviceRouter.get('/:id', auth(), serviceController.getServiceById);
    serviceRouter.put('/:id', auth(), serviceController.updateService);
    serviceRouter.delete('/:id', auth(), serviceController.deleteService)

    app.use('/service', serviceRouter);
}