"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        const { body, params, query, file, userId } = req;
        const input = { body, params, query, file, userId };
        const { error } = schema.validate(input, { abortEarly: false });
        if (!error) {
            next();
        }
        else {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            console.error('Validation error:', errorMessage);
            return res.status(400).json({ error: errorMessage });
        }
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.validate = validate;
