const Joi = require('joi');

function register(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().min(4).required().messages({
            'string.min': 'Your username must be at least 4 characters long'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Your email must be in a valid format'
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,32}$')).required().messages({
            'string.pattern.base': 'Your password must be between 8 and 32 characters long and contain only alphanumeric characters',
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        res.status(400).send({
            msg: errorMessages.join(`\n`)
        });
    } else {
        next();
    }
}

function login(req, res, next){
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Your email must be in a valid format'
        }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,32}$')).required().messages({
            'string.pattern.base': 'Your password must be between 8 and 32 characters long and contain only alphanumeric characters'
        })
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(err => err.message);
        res.status(400).send({
            msg: errorMessages.join(`\n`)
        });
    } else {
        next();
    }
}


module.exports = {
    register,
    login
};