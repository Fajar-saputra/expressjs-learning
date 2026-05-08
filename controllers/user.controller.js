const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { db } = require("../config/db");
const userService = require("../services/user.service");
const { successResponse } = require("../utils/response");

const getUser = asyncHandlerv1(async (req, res) => {
    const user = await userService.getUsers();
    successResponse(res, user, "Berhasil ambil data user");
});

const getUserById = asyncHandlerv1(async (req, res) => {
    const user = await userService.getUser(req.params.userId);
    successResponse(res, user, `User ID ${req.params.userId} ada`);
});

const createUsers = asyncHandlerv1(async (req, res) => {
    const user = await userService.createUser(req.body);
    successResponse(res, user, "Berhasil ambil data user", 201);
});

const deleteUser = asyncHandlerv1(async (req, res) => {
    const user = await userService.deleteUser(req.params.userId);
    successResponse(res, user, "User berhasil dihapus")
});

const updateUser = asyncHandlerv1(async (req, res) => {
    const user = await userService.updateUser(req.body, req.params.userId);
    successResponse(res, user, "Berhasil ambil data user")
});

module.exports = { getUser,getUserById, createUsers, getUserById, deleteUser, updateUser };
