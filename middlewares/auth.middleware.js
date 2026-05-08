const jwt = require("jsonwebtoken");
const { asyncHandlerv2 } = require("../utils/asyncHandler");
const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");

const protect = asyncHandlerv2(async (req, res, next) => {
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

        // 3. AMBIL DATA USER (jika ingin data terbaru)
        const [users] = await db.execute("SELECT id, username, email FROM users WHERE id = ?", [decoded.id]);

        // 4. SIMPAN DATA KE REQ
        req.user = users[0];

        next();
    } catch (error) {
        // Tangani error JWT spesifik (opsional tapi bagus)
        throw new AppError("Token tidak valid atau kadaluwarsa", 401);
    }
});

module.exports = { protect };
