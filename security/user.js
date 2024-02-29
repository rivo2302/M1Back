const userAcces = {
    Employee: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'"],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'"],
            exclude: ['password', 'role']
        }

    },
    Manager: {
        read: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'"],
            exclude: ['password']
        },
        write: {
            include: ['lastName', 'firstName', 'avatar', 'email', 'favoriteEmployees', "salary'"],
            exclude: null
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