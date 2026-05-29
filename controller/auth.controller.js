const authService = require("../services/auth.service");
const { appError } = require("../utils/appError");
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

const updatePassword = asyncHandler(async (req, res) => {
    const { newPassword, currentPassword } = req.body;
    const data = await authService.updatePassword(req.user.id, { newPassword, currentPassword });
    successResponse(res, data, "Berhasil update password");
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) throw new appError("Email harus diisi", 400);

    await authService.forgotPassword(email);
    successResponse(res, null, "Link reset password telah dikirim ke email Anda");
});

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) throw new appError("Password baru harus diisi", 400);
    await authService.resetPassword(token, password);

    successResponse(res, null, "Password berhasil direset");
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const data = await authService.refreshAccessToken(req.body.refreshToken)
    successResponse(res, data, "Access token baru")
})

const logout = asyncHandler(async (req, res) => {
    await authService.logout(req.user.id)
    successResponse(res, null, "Logout berhasil");
});

module.exports = { loginUser, registerUser, resetPassword, logout, updatePassword, forgotPassword };
