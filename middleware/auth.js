const jwt = require('jsonwebtoken');
const config = require('../config/conf');

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        var token = req.header('Authorization');
        
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send('No token, authorization denied');
        }
        var token = token.replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).send('User does not have permission');
            }

            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).send('Token is not valid');
        }
    };
};

module.exports = authorize;