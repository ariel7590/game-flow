import joi from 'joi';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../types/jwt.types';

export const validate = (schema: joi.Schema) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}