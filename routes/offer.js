const auth = require('../middleware/auth');

module.exports = (app) => {
    const offerRouter = require('express').Router();
    const offerController = require('../controllers/offer');

    offerRouter.post('/', auth(), offerController.createOffer);
    offerRouter.get('/', auth(), offerController.getAllOffer);
    offerRouter.get('/:id', auth(), offerController.getOfferById);
    offerRouter.put('/:id', auth(), offerController.updateOffer);
    offerRouter.delete('/:id', auth(), offerController.deleteOffer)

    app.use('/offer', offerRouter);
}
