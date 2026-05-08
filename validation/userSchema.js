const { z } = require('zod')

const userSchema = z.object({
    body: z.object({
        username: z.string().min(4, "Minimal 4 karakter").max(40, "Maksimal 40 karakter!"),
        email: z.string().email("Format email tidak wajib!"),
        password: z.string().min(7, 'Minimal 7 karakter!')
    })
})

module.exports = {userSchema}