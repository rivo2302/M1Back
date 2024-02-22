const auth = require('../middleware/auth');

module.exports = (app) => {

    const expenseRouter = require('express').Router();
    const expenseController = require('../controllers/expense');

    expenseRouter.post('/', auth(), expenseController.createExpense);
    expenseRouter.get('/', auth(), expenseController.getAllExpense);
    expenseRouter.get('/:id', auth(), expenseController.getExpenseById);
    expenseRouter.put('/:id', auth(), expenseController.updateExpense);
    expenseRouter.delete('/:id', auth(), expenseController.deleteExpense);

    app.use('/expense', expenseRouter);
}
