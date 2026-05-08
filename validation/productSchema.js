const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(4).max(100).required().messages({
        "string.min": "Minimal 4 karakter",
        "any.required": "Name wajib diisi",
    }),

    category: Joi.string().min(2).max(50).required().messages({
        "string.min": "Minimal 2 karakter",
        "any.required": "Category wajib diisi",
    }),

    description: Joi.string().min(4).max(255).allow("", null),

    price: Joi.number().integer().positive().required().messages({
        "number.base": "Price harus berupa angka",
        "any.required": "Price wajib diisi",
    }),

    // Tetap pisahkan atau masukkan field image di sini jika ingin divalidasi bersama
    image: Joi.any().optional(),
});

module.exports = { productSchema };
