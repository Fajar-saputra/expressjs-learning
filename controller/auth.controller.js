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

const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    await authService.verifyEmail(token);
    successResponse(res, "Email berhasil diverifikasi");
});

const logoutUser = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id);
    successResponse(res, "Berhasil logout");
});

const updatePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    successResponse(res, "Password berhasil diubah");
});

const forgotPassowrd = asyncHandler(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    successResponse(res, "Link reset telah dikirim");
});

const resetPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await authService.resetPassword(currentPassword, newPassword);
    successResponse(res, "Password berhasil direset");
});

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    updatePassword,
    forgotPassowrd,
    resetPassword,
    verifyEmail
};
