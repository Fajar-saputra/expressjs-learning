const { appError } = require("../utils/appError");

const validate = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

    // cek error
    if (error) {
        const pesanSpesifik = error.details[0].message; // Hasil: "Email tidak valid"
        const fieldYangSalah = error.details[0].path[0]; // Hasil: "email"
        return next(new appError(`${fieldYangSalah}: ${pesanSpesifik}`, 400));
    }

    req.body = value;
    next();
};

module.exports = { validate };
