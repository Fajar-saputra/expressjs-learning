const db = require("../config/db");
const authService = require("../services/auth.service");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const register = asyncHandlerv1(async (req, res) => {
    const user = await authService.register(req.body);
    successResponse(res, user, "Berhasil register", 201);
});

const login = asyncHandlerv1(async (req, res) => {
    const user = await authService.login(req.body);
    successResponse(res, user, "Berhasil login", 200);
});

module.exports = {
    register,
    login,
};

module.exports = { register, login };
