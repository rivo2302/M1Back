const auth = require('../middleware/auth');

const serviceController = require('../controllers/service');
const serviceSchema = require('../schemas/service');


module.exports = (app) => {
    app.post('/service', auth(), serviceController.createService);
    app.get('/service', auth(), serviceController.getAllService);
    app.get('/service/:id', auth(), serviceController.getServiceById);
    app.put('/service/:id', auth(), serviceController.updateService);
}