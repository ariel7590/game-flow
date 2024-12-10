import joi from "joi";

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
});

export const validateLogin = joi.object({
	body: joi.object({
		userName: joi.string().allow("").optional(),
		email: joi.string().email().allow("").optional(),
		password: joi.string().required(),
	}).custom((value: {userName: string, email: string}, helpers) => {
        if (!value.userName && !value.email) {
          return helpers.error('any.required');
        }
        return value;
      }, 'User Identification'),
	params: joi.object(),
	query: joi.object(),
	file: joi.object(),
	userId: joi.number().optional(),
});

export const validateAuthenticate = joi.object({
	userId: joi.alternatives().try(joi.number(), joi.string()).required(),
	body: joi.object(),
	params: joi.object(),
	query: joi.object(),
	file: joi.object(),
});

export const validateSignOut = joi.object({
	userId: joi.number().required(),
	body: joi.object(),
	params: joi.object(),
	query: joi.object(),
	file: joi.object(),
});
