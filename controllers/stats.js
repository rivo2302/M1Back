const mongoose = require('mongoose');

const appointmentSchema = require('../schemas/appointment');
const Appointment = mongoose.model('Appointment', appointmentSchema);

const expenseSchema = require('../schemas/expense');
const Expense = mongoose.model('Expense', expenseSchema);

exports.getinfos = async (req, res) => {
    const { startDate, endDate } = req.query;

    console.log(startDate, endDate)
    try {
        const expenses = await Expense.aggregate([
            {
                $match: {
                    date: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpenses: { $sum: "$price" }
                }
            }
        ]);

        const income = await Appointment.aggregate([
            {
                $match: {
                    status: "Finished",
                    startDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "requestedServices",
                    foreignField: "_id",
                    as: "services"
                }
            },
            {
                $unwind: "$services"
            },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$services.price" }
                }
            }
        ]);

        const appointmentsCount = await Appointment.aggregate([
            {
                $match: {
                    startDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);


        const commission = await Appointment.aggregate([
            {
                $match: {
                    status: "Finished",
                    startDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "requestedServices",
                    foreignField: "_id",
                    as: "services"
                }
            },
            {
                $unwind: "$services"
            },
            {
                $group: {
                    _id: "$employee",
                    totalCommission: { $sum: { $multiply: ["$services.price", { $divide: ["$services.commissionPercentage", 100] }] } }
                }
            }
        ]);

        const response = {
            revenue: {
                profit: income[0] ? income[0].totalIncome - (expenses[0] ? expenses[0].totalExpenses : 0) : 0,
                expenses: expenses[0] ? expenses[0].totalExpenses : 0,
                income: income[0] ? income[0].totalIncome : 0,
            },
            appointments: {
                inProgress: appointmentsCount.find(a => a._id === "InProgress")?.count || 0,
                ready: appointmentsCount.find(a => a._id === "Ready")?.count || 0,
                finished: appointmentsCount.find(a => a._id === "Finished")?.count || 0,
                total: appointmentsCount.reduce((acc, curr) => acc + curr.count, 0)
            },
            commission: {
                amount: commission.reduce((acc, curr) => acc + curr.totalCommission, 0),
                number: commission.length
            }
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ message: "Error calculating statistics", error });
    }
}
