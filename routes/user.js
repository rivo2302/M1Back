const auth = require('../middleware/auth');

module.exports = app => {
    const userRouter = require('express').Router();
    const userController = require('../controllers/user');

    userRouter.post('/signup', userController.signupUser);
    userRouter.get('/login', userController.loginUser);
    userRouter.get('/', auth(['Manager']), userController.getAllUser);

    app.use('/user', userRouter);
}