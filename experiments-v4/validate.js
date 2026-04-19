const validate = (schema) = (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abort
    })
}

module.exports = validate;