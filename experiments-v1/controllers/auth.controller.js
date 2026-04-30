const { asyncHandlerv1 } = require("../utils/asyncHandler");
const {db} = require("../config/db");
const { AppError } = require("../utils/appError");
const {successResponse} = require('../utils/response')

const authService = require("../services/auth.service")

const register = asyncHandlerv1(async (req, res) => {
    const user = await authService.register(req.body)
    successResponse(res, user, "Berhasil register", 201)
});

const login = asyncHandlerv1(async (req, res) => {
    const user = await authService.login(req.body)
    successResponse(res, user, "Berhasil register", 201)
});

const protect = asyncHandlerv1(async (req, res, next) => {
    let token;

    // Langsung usir jika header tidak ada atau format salah
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new AppError("Anda belum login, silakan login terlebih dahulu", 401);
    }

    try {
        // 2. VERIFIKASI TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. AMBIL DATA USER
        const [users] = await db.execute("SELECT id, username, email FROM users WHERE id = ?", [decoded.id]);

        if (users.length === 0) {
            throw new AppError("User pemilik token ini sudah tidak ada", 401);
        }

        // 4. SIMPAN DATA KE REQ
        req.user = users[0];

        next();
    } catch (error) {
        // Tangani error JWT spesifik (opsional tapi bagus)
        throw new AppError("Token tidak valid atau kadaluwarsa", 401);
    }
});

module.exports = { register, login, protect };
