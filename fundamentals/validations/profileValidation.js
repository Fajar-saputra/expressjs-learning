    const z = require("zod");

    const profileShcema = z.object({
        body: z.object({
            full_name: z.string().min(4, "Minimal 4 karakter!!").max(40, "Maksimal 40 karakter"),
            bio: z.string().optional(),
            phone_number: z.string().min(9, "Minimal 9 angka").max(14, "Maksimal 14 karakter"),
            city: z.string().min(4, "Minimal 4 karakter!!").max(40, "Maksimal 40 karakter"),
        }),
    });

    module.exports = { profileShcema };
