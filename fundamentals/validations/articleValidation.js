const z = require('zod')

const articleSchema = z.object({
    body: z.object({
        title: z.string().min(4, "Minimal 4 karakter"),
        content: z.string().min(4, "Minimal 4 karakter")
    })
})  

module.exports = {articleSchema}