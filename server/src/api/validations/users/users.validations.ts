import joi from 'joi';

export const validateCreateNewUser = joi.object({
    body: joi.object({
        userName: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required(),
    }),
    params: joi.object(),
    query: joi.object(),
    file: joi.object(),
    userId: joi.number().optional(),
})

// export const validateLogin=joi.object({
//     body: joi.object({
//         userName: joi.string().required(),
//         password: joi.string().required(),
//         email: joi.string().required(),
//     }),
//     params: joi.object(),
//     query: joi.object(),
//     file: joi.object(),
//     userId: joi.number().optional(),
// })

export const validateAuthenticate=joi.object({
    userId: joi.number().required(),
    body: joi.object(),
    params: joi.object(),
    query: joi.object(),
    file: joi.object(),
})

export const validateSignOut=joi.object({
    userId: joi.number().required(),
    body: joi.object(),
    params: joi.object(),
    query: joi.object(),
    file: joi.object(),
})