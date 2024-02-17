const userAcces = {
    Employee: {
        read: {
            include: ['lastName', 'firstName', 'photo', 'email', 'role','workSchedule'],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'photo', 'email', 'workSchedule' , 'commissionPercentage'],
            exclude: [ 'password' , 'role']
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
            exclude: ['password', 'role']
        },
        write: {
            include: ['lastName', 'firstName', 'photo', 'email', 'password', 'favoriteEmployees'],
            exclude: ['role']
        }

    }
}

module.exports = userAcces; 