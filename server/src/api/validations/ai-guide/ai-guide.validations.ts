import joi from 'joi';

export const validateGenerateGuide = joi.object({
    body: joi.object({
        prompt: joi.string().required()
    }),
    params: joi.object(),
    query: joi.object(),
    file: joi.object(),
})