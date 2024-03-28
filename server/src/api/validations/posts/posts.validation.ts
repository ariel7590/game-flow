import joi from 'joi';

export const validateGetPaginatedPosts=joi.object({
    query: joi.object({
        page: joi.string().required(),
    }),
    body: joi.object(),
    params: joi.object(),
    file: joi.object(),
    userId: joi.number().optional(),
})

export const validateGetPostById=joi.object({
    params: joi.object({
        postId: joi.string().required(),
    }),
    query: joi.object(),
    body: joi.object(),
    file: joi.object(),
    userId: joi.number().optional(),
})

export const validateCreateNewPost=joi.object({
    body: joi.object({
        publisher: joi.string().required(),
        publisherId: joi.string().required(),
        gameName: joi.string().required(),
        title: joi.string().required(),
        body: joi.string().required(),
        media: [joi.string().optional()],
    }),
    file: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required()
    }),
    params: joi.object(),
    query: joi.object(),
    userId: joi.number().required(),
})

export const validateDeletePost = joi.object({
    params: joi.object({
        postId: joi.string().required(),
    }),
    userId: joi.number().required(),
    query: joi.object(),
    body: joi.object(),
    file: joi.object(),
})

export const validateEditPost = joi.object({
    body: joi.object({
        postId: joi.string().required(),
	newGameName: joi.string().required(),
	newTitle: joi.string().required(),
	newContent: joi.string().required(),
	newMedia: joi.string().required(),
	publisherId: joi.string().required()
    }),
    file: joi.object({
        fieldname: joi.string().required(),
        originalname: joi.string().required(),
        encoding: joi.string().required(),
        mimetype: joi.string().valid('image/jpeg', 'image/png').required(),
        destination: joi.string().required(),
        filename: joi.string().required(),
        path: joi.string().required(),
        size: joi.number().required()
    }),
    userId: joi.number().required(),
    params: joi.object(),
    query: joi.object(),
})