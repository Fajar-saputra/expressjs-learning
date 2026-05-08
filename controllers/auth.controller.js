const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { db } = require("../config/db");
const { AppError } = require("../utils/appError");
const { successResponse } = require("../utils/response");

const authService = require("../services/auth.service");

const register = asyncHandlerv1(async (req, res) => {
    const user = await authService.register(req.body);
    successResponse(res, user, "Berhasil register", 201);
});

const login = asyncHandlerv1(async (req, res) => {
    const user = await authService.login(req.body);
    successResponse(res, user, "Berhasil register", 201);
});

const getMeController = asyncHandlerv1(async (req, res) => {
    const user = await authService.getMe(req.user.id);
    successResponse(res, user, "Berhasil ambil get me");
});

module.exports = { register, login, getMeController };
