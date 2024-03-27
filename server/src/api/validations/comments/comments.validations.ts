import joi from 'joi';

export const validateCreateNewComment = joi.object({
    body: joi.object({
        postId: joi.string().required(),
        body: joi.string().required(),
        media: [joi.string().optional()],
        publisher: joi.string().required(),
        publisherId: joi.number().required()
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
    userId: joi.number()
})

export const validateFindCommentWithCommentId = joi.object({
    params: joi.object({
        commentId: joi.string().required()
    }),
    body: joi.object(),
    query: joi.object(),
    file: joi.object(),
    userId: joi.number().optional()
})

export const validateGetPaginatedComments = joi.object({
    query: joi.object({
        page: joi.string().required()
    }),
    params: joi.object({
        postId: joi.string().required()
    }),
    body: joi.object(),
    file: joi.object(),
    userId: joi.number().optional()
})

export const validateDeleteComment = joi.object({
    params: joi.object({
        commentId: joi.string().required()
    }),
    userId: joi.number().required(),
    query: joi.object(),
    body: joi.object(),
    file: joi.object(),
})

export const validateEditComment = joi.object({
    body: joi.object({
        commentId: joi.string().required(),
        newContent: joi.string().required(),
        publisherId: joi.string().required(),
        editorId: joi.number().required(),
        newMedia: joi.string().optional()
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
    query: joi.object()
})

export const validateRankComment = joi.object({
    body: joi.object({
        commentId: joi.string().required(),
        newRank: joi.number().required(),
        rankerId: joi.number().required()
    }),
    userId: joi.number().required(),
    params: joi.object(),
    query: joi.object(),
    file: joi.object()
})