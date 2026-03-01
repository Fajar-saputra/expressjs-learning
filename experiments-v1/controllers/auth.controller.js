const { asyncHandler } = require("../utils/asyncHandler");
const db = require("../config/db");
const { AppError } = require("../utils/appError");

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // cek email sudah terdaftar?
    const [existingUser] = await db.execute("SELECT email FROM users WHERE email = ?", [email])

    if (existingUser.length > 0) {
        throw new AppError("Email sudah didaftarkan!", 400);
    }

    // hash passowrd
})