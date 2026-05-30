const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "org", "id"] },
        })
        .required()
        .messages({
            "string.email": "Email tidak valid",
            "string.empty": "Email tidak boleh kosong",
            "any.required": "Email wajib diisi",
        }),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
        "string.empty": "Password tidak boleh kosong",
        "string.pattern.base": "Password hanya boleh huruf dan angka (3-30 karakter)",
        "any.required": "Password wajib diisi",
    }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "org", "id"] },
        })
        .required()
        .messages({
            "string.email": "Email tidak valid",
            "string.empty": "Email tidak boleh kosong",
            "any.required": "Email wajib diisi",
        }),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required().messages({
        "string.empty": "Password tidak boleh kosong",
        "string.pattern.base": "Password hanya boleh huruf dan angka (3-30 karakter)",
        "any.required": "Password wajib diisi",
    }),
});

const paramsId = Joi.object({
    productId: Joi.number().integer().min(1).required().messages({ "any.require": "ID product wajib diisi" }),
});

module.exports = { registerSchema, loginSchema, paramsId };
