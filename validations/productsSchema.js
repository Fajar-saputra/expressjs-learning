const Joi = require('joi')
 
const productsSchema = Joi.object({
    name: Joi.string().min(5).max(255).required().trim().messages({
        "string.base": `"name" harus berupa teks`,
        "string.empty": `"name" tidak boleh kosong`,
        "string.min": `"name" minimal harus {#limit} karakter`,
        "any.required": `"name" adalah field yang wajib diisi`,
    }),
    price: Joi.number().integer().min(20000).max(100000000000).required().messages({
        "number.base": "Harga harus berupa angka",
        "number.integer": "Harga tidak boleh mengandung desimal",
        "number.min": "Harga minimal adalah Rp {#limit}",
        "number.max": "Harga maksimal adalah Rp {#limit}",
        "any.required": "Harga wajib diisi",
    }),
    description: Joi.string().min(5).trim().required(),
    category: Joi.string().required()
});

const paramsSchema = Joi.object({
    productId: Joi.number().integer().required().positive().messages({
        "number.base": "Harus angka",
        "any.required": "wajib diisi",
    }),
});

module.exports = {productsSchema, paramsSchema}