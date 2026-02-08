// exports.getUser = (req, res) => {
//     res.send(`Ambil user`)
// }

// exports.createUser = (req, res) => {
//     const { nama, umur } = req.body;
//     res.send(`User ${nama} ${umur} berhasil dibuat!`)
// }

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nama, umur } = req.body;
    res.send(`Nama ${nama} dan umur ${umur} berhasil update!`);
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    res.send(`User id ${id}`);
};

// kelas industri
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.getUser = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Berhasil ambil data user",
        data: [],
    });
};

// exports.createUser = (req, res, next) => {
//     const { nama, umur } = req.body;

//     if (!nama) {
//         return next(new AppError("Nama wajib ada", 400));
//     }

//     if (!umur || isNaN(umur)) {
//         return next(new AppError("Umur harus berupa angka", 400));
//     }

//     if (umur < 1) {
//         return next(new AppError("Umur tidak valid", 400));
//     }

//     res.status(201).json({
//         success: true,
//         message: `Berhasil buat ${nama}`,
//         data: {
//             nama,
//             umur,
//         },
//     });
// };

exports.createUser = asyncHandler(async (req, res, next) => {
    const { nama, umur } = req.body;

    if (!nama) throw new AppError("Nama wajib ada!", 400);
    if (!umur || isNaN(umur)) throw new AppError("Umur wajib ada!", 400);
    if (umur < 1) throw new AppError("Umur tidak valid!", 400);

    await new Promise((resolve) => setTimeout(resolve, 100));

    res.status(201).json({
        success: true,
        message: "berhasil dibuat",
        data: { nama, umur },
    });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (id !== "1") throw new AppError("User tidak ditemukan!!", 404);

    // simulasi async (misalnya database)
    await new Promise((resolve) => setTimeout(resolve, 100));

    res.status(200).json({
        success: true,
        message: `User dengan ID ${id} ditemukan`,
    });
});