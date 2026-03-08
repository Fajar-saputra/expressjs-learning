const { z } = require("zod");

const authSchema = {
    register: z.object({
        body: z.object({
            username: z.string().min(4).max(50),
            password: z.string().min(8),
            nama_lengkap: z.string().min(3).max(100),
            email: z.string().email().optional(),
            no_telepon: z.string().max(20).optional(),
            is_superadmin: z.boolean().optional().default(false),
        }),
    }),

    login: z.object({
        body: z.object({
            username: z.string().min(1),
            password: z.string().min(1),
        }),
    }),
};

module.exports = { authSchema };
