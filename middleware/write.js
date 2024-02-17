const accessWrite = (fieldsAccessRules, schema) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        const writeRules = fieldsAccessRules[userRole].write;

        var fields = [];

        if (writeRules.include) {
            fields = writeRules.include;
        } else {
            fields = Object.keys(schema.paths);
        }

        if (writeRules.exclude) {
            fields = fields.filter(field => !writeRules.exclude.includes(field));
        }

        const fieldsToUpdate = Object.keys(req.body);
        const invalidFields = fieldsToUpdate.filter(field => !fields.includes(field));

        if (invalidFields.length > 0) {
            return res.status(403).send({ message: `You are not allowed to update the following fields: ${invalidFields.join(', ')}` });
        }

        next();
    };
}

module.exports = accessWrite;