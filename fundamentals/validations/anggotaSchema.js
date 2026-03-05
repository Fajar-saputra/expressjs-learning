const { z } = require('zod');

const anggotaSchema = {
  create: z.object({
    nim: z.string().min(5).max(20).optional(),
    nama: z.string().min(3).max(100),
    jurusan: z.string().max(100).optional(),
    prodi: z.string().max(100).optional(),
    semester: z.number().int().min(1).max(14).optional(),
    email: z.string().email().optional(),
    no_telepon: z.string().max(20).optional(),
    alamat: z.string().max(500).optional(),
  }),

  update: z.object({
    nim: z.string().min(5).max(20).optional(),
    nama: z.string().min(3).max(100).optional(),
    jurusan: z.string().max(100).optional(),
    prodi: z.string().max(100).optional(),
    semester: z.number().int().min(1).max(14).optional(),
    email: z.string().email().optional(),
    no_telepon: z.string().max(20).optional(),
    alamat: z.string().max(500).optional(),
    status: z.enum(['aktif', 'nonaktif', 'diblacklist', 'alumni']).optional(),
  }).partial().refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  }),

  idParam: z.object({
    id: z.string().regex(/^\d+$/, "ID harus berupa angka"),
  }),
};

module.exports = anggotaSchema;