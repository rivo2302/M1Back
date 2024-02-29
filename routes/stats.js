
const auth = require('../middleware/auth');
const statController = require('../controllers/stats'); // Assurez-vous que le chemin est correct

module.exports = (app) => {
    const statRouter = require('express').Router();

    statRouter.get('/', auth(), statController.getinfos);

    app.use('/stat', statRouter);
};