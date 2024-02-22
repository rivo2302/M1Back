const mongoose = require('mongoose');

const expenseSchema = require('../schemas/expense');
const Expense = mongoose.model('Expense', expenseSchema);

exports.createExpense = async (req, res) => {
    const expense = new Expense();
    for (let key in req.body) {
        expense[key] = req.body[key];
    }
    try {
        const newExpense = await expense.save();
        res.status(201).send(newExpense);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getAllExpense = async (req, res) => {
    try {
        var expenses = await Expense.find();
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.getExpenseById = async (req, res) => {
    try {
        var expense = await Expense.findById(req.params.id);
        res.status(200).send(expense);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


exports.updateExpense = async (req, res) => {
    try {
        var expense = await Expense.findById(req.params.id);
        for (let key in req.body) {
            expense[key] = req.body[key];
        }
        var updatedExpense = await expense.save();
        res.status(200).send(updatedExpense);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        var expense = await Expense.findById(req.params.id);
        var deletedExpense = await expense.remove();
        res.status(200).send(deletedExpense);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

