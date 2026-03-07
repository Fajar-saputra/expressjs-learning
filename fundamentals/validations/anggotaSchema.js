const { z } = require("zod");

const anggotaSchema = {
    create: z.object({
        body: z.object({
            nim: z.string().min(5).max(20),
            nama: z.string().min(3).max(100),
            jurusan: z.string().max(100),
            prodi: z.string().max(100),
            semester: z.number().int().min(1).max(14),
            angkatan: z.string().regex(/^\d{4}$/, "Format angkatan harus 4 digit tahun"),
            email: z.string().email(),
            no_telepon: z.string().max(20),
            tanggal_daftar: z.string().datetime().optional(),
            tanggal_akhir_aktif: z.string().datetime().optional(),
            alamat: z.string().max(500),
            foto: z.string().url().optional(), // Opsional jika belum ada foto
        }),
    }),

    update: z
        .object({
            body: z
                .object({
                    nim: z.string().min(5).max(20).optional(),
                    nama: z.string().min(3).max(100).optional(),
                    jurusan: z.string().max(100).optional(),
                    prodi: z.string().max(100).optional(),
                    semester: z.number().int().min(1).max(14).optional(),
                    email: z.string().email().optional(),
                    no_telepon: z.string().max(20).optional(),
                    alamat: z.string().max(500).optional(),
                    status: z.enum(["aktif", "nonaktif", "diblacklist", "alumni"]).optional(),
                })
                .refine((data) => Object.keys(data).length > 0, {
                    message: "Minimal satu field harus diisi untuk update",
                }),
        })
        .partial()
        .refine((data) => Object.keys(data).length > 0, {
            message: "Minimal satu field harus diisi untuk update",
        }),

    idParam: z.object({
        params: z.object({
            id: z.string().regex(/^\d+$/, "ID harus berupa angka"),
        }),
    }),
};

module.exports = anggotaSchema;
