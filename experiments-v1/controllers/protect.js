const jwt = require('jsonwebtoken');
const {asyncHandler} = require('../utils/asyncHandler')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Cek apakah ada header Authorization yang mulai dengan 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Ambil token-nya saja (buang kata 'Bearer')
            token = req.headers.authorization.split(' ')[1];

            // 2. Verifikasi Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Ambil data user dari DB (buang password-nya demi keamanan)
            const [users] = await db.execute(
                "SELECT id, username, email FROM users WHERE id = ?", 
                [decoded.id]    
            );

            if (users.length === 0) {
                throw new AppError("User pemilik token ini sudah tidak ada", 401);
            }

            // 4. SIMPAN DATA USER KE REQ (Ini bagian paling sakti!)
            req.user = users[0];

            console.log(req.user);
            

            next(); // Lanjut ke Controller
        } catch (error) {
            throw new AppError("Token tidak valid atau kadaluwarsa", 401);
        }
    }

    if (!token) {
        throw new AppError("Anda belum login, silakan login terlebih dahulu", 401);
    }
});

module.exports = { protect };