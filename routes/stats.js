
const auth = require('../middleware/auth');
const offerController = require('../controllers/offerController'); // Assurez-vous que le chemin est correct

module.exports = (app) => {
    const offerRouter = express.Router();

    // Les routes pour les opérations demandées
    offerRouter.get('/reservations-count', auth(), offerController.getReservationsCount);
    offerRouter.get('/turnover', auth(), offerController.getTurnover);
    offerRouter.get('/profit', auth(), offerController.getProfit);

    app.use('/offer', offerRouter);
};