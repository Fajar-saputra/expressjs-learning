const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config();

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // cek email sudah ada?
    const [rows] = await db.execute("SELECT email FROM users WHERE email =  ?", [email]);

    if (rows.length > 0) {
        return res.status(200).json({
            message: "Email sudah terdaftar!!",
        });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // simpan data tadi
    const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, hashPassword]);
    // await db.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashPassword])

    res.status(201).json({
        success: true,
        message: "Berhasil daftar",
        data: {
            id: result.insertId,
            name,
            email,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
        return res.status(401).json({ message: "Email belum terdaftar" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role ?? user.rule ?? null,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        },
    );

    res.status(200).json({
        success: true,
        message: "berhasil login",
        data: {
            username: user.username ?? user.name ?? null,
            token: token,
            role: user.role ?? user.rule ?? null,
        },
    });
};


const protect = () => {
    
}

module.exports = { register, login };
