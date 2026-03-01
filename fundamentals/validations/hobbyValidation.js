const z = require('zod')

const hobbyShcema = z.object({
    body: z.object({
        name: z.string()
        .min(4, "Nama hobi harus lebih dari 4 karakter")
            .max(40, "Nama hobi maksimal 40 karakter"),
        description: z.string().optional()
        
    })
})

module.exports = {hobbyShcema}