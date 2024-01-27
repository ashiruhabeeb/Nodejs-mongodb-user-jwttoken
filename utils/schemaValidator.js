const joi = require('joi');

function signupPayloadValidator(data) {
    const schema = joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(7).required(),
        confirmPassword: joi.string().min(7).required(),
        phone: joi.string().min(11).max(14).required(),
        address: joi.string().required()
    });

    return schema.validate(data);
};

function userEditPayloadValidator(data) {
    const schema = joi.object({
        firstname: joi.string(),
        lastname: joi.string(),
        username: joi.string(),
        email: joi.string().email(),
        password: joi.string().min(7),
        confirmPassword: joi.string().min(7),
        phone: joi.string().min(11).max(14),
        address: joi.string()
    });

    return schema.validate(data);
};

function loginPayloadValidation(data){
    const schema = joi.object({
        email: joi.string().email().required(),
        password:joi.string().min(7).required()
    });
    return schema.validate(data);
}

module.exports = { signupPayloadValidator, userEditPayloadValidator, loginPayloadValidation };
