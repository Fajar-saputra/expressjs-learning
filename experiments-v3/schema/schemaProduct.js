const Joi = require("joi");

const schemaProduct = Joi.object({
    name: Joi.string()
        .min(5)
        .max(255)
        .required()
        .trim(),
    price: Joi.number()
        .integer()
        .min(20000)
        .max(100000000000),
    description: Joi.string()
        .min(5)
        .trim()
        .required()
});

module.exports = {schemaProduct}