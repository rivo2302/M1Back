const userAcces = {
    Manager: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'salary', 'role', 'workSchedule'],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'salary', 'role', 'workSchedule'],
            exclude: null
        }
    },
    Employee: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'salary', 'role', 'workSchedule'],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'salary', 'workSchedule'],
            exclude: ['password', 'role']
        }

    },
    Client: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'role'],
            exclude: ['password', 'salary', 'workSchedule']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'password', 'favoriteEmployees'],
            exclude: ['password', 'role', 'workSchedule']
        }

    }
}

module.exports = userAcces; 