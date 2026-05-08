const validateJoi =
    (schema, source = "body") =>
    (req, res, next) => {
        const { error, value } = schema.validate(req[source]);

        if (error) {
            const cleanMessage = error.details[0].message.replace(/"/g, "");
            return res.status(400).json({
                success: false,
                message: cleanMessage,
            });
        }

        req[source] = value;
        next();
    };

// ZOD
const validateZod = (schema) => (req, res, next) => {
    try {
        const validatedData = schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        req.body = validatedData.body || req.body;
        req.params = validatedData.params || req.params;
        req.query = validatedData.query || req.query;

        next();
    } catch (error) {
        // Pastikan ini error dari Zod
        if (error.issues) {
            const errors = {};

            error.issues.forEach((issue) => {
                const location = issue.path[0]; // body / params / query
                const field = issue.path[1];

                if (!errors[location]) errors[location] = {};
                errors[location][field] = issue.message;
            });

            return res.status(400).json({
                success: false,
                message: "Validasi gagal",
                errors,
            });
        }

        next(error);
    }
};

module.exports = { validateZod, validateJoi };
