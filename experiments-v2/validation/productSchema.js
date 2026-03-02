const { z } = require("zod");

const productSchema = z.object({
    body: z.object({
        name: z.string().min(4, "Minimal 4 karakter").max(100, "Maksimal 100 karakter"),

        description: z.string().min(4, "Minimal 4 karakter").max(255, "Maksimal 255 karakter").optional().or(z.literal("")),

        price: z
            .number({
                required_error: "Price wajib diisi",
                invalid_type_error: "Price harus berupa angka",
            })
            .positive("Price harus lebih dari 0")
            .int(),
    }),
});

module.exports = { productSchema };
