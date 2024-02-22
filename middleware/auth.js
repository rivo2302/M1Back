const jwt = require('jsonwebtoken');
const config = require('../config/conf');

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        console.log('authorize');
        var token = req.header('Authorization');
        
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).send('No token, authorization denied');
        }
        var token = token.replace('Bearer ', '');

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
            
            if (allowedRoles === undefined || allowedRoles.length === 0 ){
                return next();
            }
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).send('User does not have permissiosn');
            }
            next();
        } catch (error) {
            res.status(401).send('Token is not valid');
        }
    };
};

module.exports = authorize;