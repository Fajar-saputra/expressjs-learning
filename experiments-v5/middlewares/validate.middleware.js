const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[source])
        
        if (error) {
            const cleanMessage = error.details[0].message.replace(/"/g, '');
            return res.status(400).json({
                success: false,
                message: cleanMessage
            })
        }


        req[source] = value;
        next()
    }
}

module.exports = {validate}