const userAcces = {
    Manager: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'", "role"],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'", "role"],
            exclude: null
        }
    },
    Employee: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'", "role"],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'", "role"],
            exclude: ['password']
        }

    },
    Client: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', 'role'],
            exclude: null
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'password', 'favoriteEmployees'],
            exclude: null
        }

    }
}

module.exports = userAcces; 