
const accessRead = (fieldsAccessRules, schema) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        const readRules = fieldsAccessRules[userRole].read;

        var fields = [];

        if (readRules.include) {
            fields = readRules.include;
        } else {
            fields = Object.keys(schema.paths);
        }

        if (readRules.exclude) {
            fields = fields.filter(field => !readRules.exclude.includes(field));
        }

        req.fields = fields.join(' ');

        
        next();
    };
}

module.exports = accessRead;
