const userAcces = {
    Employee: {
        read: {
            include: null,
            exclude: ['password']
        },
        write: {
            include: null,
            exclude: ['password', 'role', 'commissionPercentage']
        }

    },
    Manager: {
        read: {
            include: null,
            exclude: ['password']
        },
        write: {
            include: null,
            exclude: null
        }
    },
    Client: {
        read: {
            include: ['lastName', 'firstName', 'photo', 'email', 'favoriteEmployees'],
            exclude: null
        },
        write: {
            include: ['lastName', 'firstName', 'photo', 'email', 'password', 'favoriteEmployees'],
            exclude: null
        }

    }
}

module.exports = userAcces; 