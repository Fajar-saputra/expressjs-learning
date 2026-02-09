const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next(); // Lanjut ke controller jika valid
    } catch (error) {
        return res.status(400).json({ errors: error.errors });
    }
};

module.exports = validate;
