const auth = require('../middleware/auth');
const accessRead = require('../middleware/read');
const accessWrite = require('../middleware/write');

const userAcces = require('../security/user');
const userSchema = require('../schemas/user');


module.exports = app => {
    const userRouter = require('express').Router();
    const userController = require('../controllers/user');

    userRouter.post('/signup', userController.signupUser);
    userRouter.post('/login', userController.loginUser);
    userRouter.get('/', auth(), accessRead(userAcces, userSchema), userController.getAllUser);
    userRouter.get('/:id', auth(), accessRead(userAcces, userSchema), userController.getUserById);
    userRouter.put('/:id', auth(), accessWrite(userAcces, userSchema), userController.updateUser);

    app.use('/user', userRouter);
}
