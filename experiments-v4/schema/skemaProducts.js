const Joi = require('joi')

const schemaProduct = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required()
        .trim()
        .messages({
            "string.base": "Nama harus berupa teks",
            "string.empty": "Nama tidak boleh kosong",
            "string.min": "Nama minimal harus {#limit} karakter",
            "string.max": "Nama maksimal {#limit} karakter",
            "any.required": "Nama wajib diisi"
        }),
    price: Joi.number()
        .integer()
        .min(20000)
        .required()
        .messages({
            "number.base": "Harga harus berupa angka",
            "number.integer": "Harga tidak boleh desimal",
            "any.required": "Harga belum diisi"
        })
});

module.exports = {schemaProduct}