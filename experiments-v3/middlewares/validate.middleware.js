const validate = (schema, source = "body") => {
    return (req, res, next) => {
        // req['body'] atau req['params']
        const { error, value } = schema.validate(req[source]);

        if (error) {
            return res.status(400).json({
                success: false,
                // Mengambil pesan pertama saja supaya user tidak pusing
                message: error.details[0].message,
            });
        }

        // Penting: ganti data lama dengan data yang sudah bersih dari Joi
        req[source] = value;
        next();
    };
};

module.exports = { validate };
