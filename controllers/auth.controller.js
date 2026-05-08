const db = require("../config/db");
const authService = require("../services/auth.service");
const { asyncHandlerv2 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const register = asyncHandlerv2(async (req, res) => {
    const user = await authService.register(req.body);
    successResponse(res, user, "Berhasil register", 201);
});

const login = asyncHandlerv2(async (req, res) => {
    const user = await authService.login(req.body);
    successResponse(res, user, "Berhasil login", 200);
});

module.exports = {
    register,
    login,
};

module.exports = { register, login };
