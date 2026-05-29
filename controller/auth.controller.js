const authService = require("../services/auth.service");
const { asyncHandler } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/successResponse");

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login({ email, password });
    successResponse(res, user, "Berhasil login", 200);
});

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;
    const user = await authService.register({ email, username, password, role });
    successResponse(res, user, "Berhasil register", 201);
});

const logoutUser = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);
    successResponse(res, "Berhasil logout");
});

module.exports = { loginUser, registerUser, logoutUser };
