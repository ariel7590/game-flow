import joi from 'joi';
import { RequestHandler } from 'express';

export const validate = (schema:joi.Schema): RequestHandler => (req, res, next) => {
    try {
        const { body, params, query } = req;
        const input = { body, query, params };
        const { error } = schema.validate(input, { abortEarly: false });
        if (!error) {
            next();
        }
        else {
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            console.error('Validation error:', errorMessage);
            return res.status(400).json({ error: errorMessage });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}