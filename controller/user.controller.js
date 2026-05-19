const userService = require("../services/user.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const createUserByAdmin = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = await userService.createUserByAdmin({ username, email, password, role });
    successResponse(res, user, "Berhasil create user baru", 201);
});

const userById = asyncHandler(async (req, res) => {
    const user = await userService.getById(req.params.userId);
    successResponse(res, user, `Berhasil user ID ${user.id}`);
});
const userAll = asyncHandler(async (req, res) => {
    const user = await userService.getByAll();
    successResponse(res, user, `Berhasil ambil semua user`);
});

module.exports = { createUserByAdmin, userById, userAll };
