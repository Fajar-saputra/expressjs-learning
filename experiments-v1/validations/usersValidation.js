const { z } = require("zod");

const usersSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(4, "Username minimal 4 karakter")
            .max(40, "Username maksimal 40 karakter"),

        email: z
            .string()
            .email("Format email tidak valid"),

        password: z
            .string()
            .min(7, "Password minimal 7 karakter")
    })
});

module.exports = { usersSchema };