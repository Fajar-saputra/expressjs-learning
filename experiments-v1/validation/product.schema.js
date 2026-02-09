const { z } = require("zod");

const productSchema = z.object({
  namaBarang: z.string().min(4, "Minimal 4 karakter"),
  hargaBarang: z.number().min(100000, "Minimal Rp. 100.000"),
  satuan: z.string().min(1, "Satuan wajib ada"),
});

module.exports = { productSchema };
