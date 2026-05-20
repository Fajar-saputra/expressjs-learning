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

const resetPassoword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    await authService.resetPassoword(token, req.body.password);

    successResponse(res, null, "Password berhasil direset");
});

const updatePassword = asyncHandler(async (req, res) => {
    const { newPassword, currentPassword } = req.body;
    const data = authService.updatePassword(req.user.id, { newPassword, currentPassword });

    successResponse(res, data, "Berhasil update password");
});

const forgotPassword = asyncHandler(async (req, res) => {
    await authService.forgotPassword()
    successResponse(res, null, "Link reset berhasil dikirim")
})

const logout = asyncHandler(async (req, res) => {
    successResponse(res, null, "Logout berhasil");
});

module.exports = { loginUser, registerUser, resetPassoword, logout, updatePassword };
