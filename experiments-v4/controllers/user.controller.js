const userService = require("../services/user.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseHelper");

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUser();
    return successResponse(res, users, "Berhasil mengambil semua data user");
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getById(req.params.id);
    return successResponse(res, user, "Berhasil mengambil detail user");
});

const createUser = asyncHandler(async (req, res) => {
    const imagePath = req.file ? req.file.path : null;
    const userData = {
        ...req.body,
        image: imagePath,
    };

    const newUser = await userService.createUser(userData);
    return successResponse(res, { id: newUser.insertId }, "User berhasil dibuat", 201);
});

const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const imagePath = req.file ? req.file.path : undefined;

    const updateData = {
        ...req.body,
        ...(imagePath && { image: imagePath }),
    };

    await userService.updateUser(userId, updateData);
    return successResponse(res, null, `User dengan ID ${userId} berhasil diperbarui`);
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    return successResponse(res, null, `User dengan ID ${userId} berhasil dihapus`);
});

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
