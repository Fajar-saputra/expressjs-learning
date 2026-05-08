const { successResponse } = require('../utils/response');
const { asyncHandlerv2 } = require('../utils/asyncHandler');
const userService = require('../services/user.service');

// 1. Mengambil Semua User (Khusus Admin)
const getUsers = asyncHandlerv2(async (req, res) => {
    const users = await userService.getUsers();
    successResponse(res, users, "Berhasil mengambil semua data user");
});

// 2. Mengambil Satu User Berdasarkan ID
const getUser = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUser(id);
    successResponse(res, user, "Berhasil mengambil data user");
});

// 3. Membuat User Baru (Bisa untuk Register atau Admin Create)
const createUser = asyncHandlerv2(async (req, res) => {
    const { username, email, password, image } = req.body;
    let imagePath = null;

    if (req.file) {
        imagePath = `/uploads/${req.file.filenames}`
    }

    const newUser = await userService.createUser(username, email, password, imagePath);
    successResponse(res, newUser, "User berhasil dibuat", 201);
});

// 4. Update User oleh Admin (Bisa mengubah data orang lain via ID)
const updateUserByAdmin = asyncHandlerv2(async (req, res) => {
    const { id } = req.params; 
    // Data yang akan diupdate dikirim melalui Body
    const updatedUser = await userService.updateUser(req.body, id);
    successResponse(res, updatedUser, "Data user berhasil diperbarui oleh admin");
});

// 5. Menghapus User
const deleteUser = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;
    await userService.deleteUser(id);
    successResponse(res, null, "User berhasil dihapus");
});

const getMeByUser = asyncHandlerv2(async (req, res) => {
    const me = await userService.getMe(req.user.id)
    successResponse(res, me, "Berhasil ambil data me")
})

module.exports = { 
    getUsers, 
    getUser, 
    createUser, 
    updateUserByAdmin, 
    deleteUser,
    getMeByUser
};