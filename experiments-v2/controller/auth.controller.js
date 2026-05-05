const { asyncHandlerv2 } = require("../utils/asyncHandler");
require("dotenv").config();

const authService = require("../services/auth.service");
const { successResponse } = require("../utils/response");

const register = asyncHandlerv2(async (req, res) => {
    const user = await authService.register(req.body);
    successRespon(res, user, "Berhasil register", 201);
});

const login = asyncHandlerv2(async (req, res) => {
    const user = await authService.login(req.body);
    successRespon(res, user, "Berhasil login", 200);
});

const getMeController = asyncHandlerv2(async (req, res) => {
    const user = await authService.getMe(req.user.id);
    successResponse(res, user, "Data user");
});

module.exports = { login, register, getMeController };
