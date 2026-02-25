const db = require("../config/db");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const getArticles = asyncHandler(async (req, res) => {
    const [rows] = await db.execute("SELECT title, content FROM articles");

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Article masih kosong!",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "Data berhasil diambil",
        data: rows,
    });
});

const createArticles = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (title.length < 4 || content.length < 4) {
        throw new AppError("title harus lebih dari 4 karakter!", 400);
    }

    const [result] =await db.execute("INSERT INTO articles (title, content) VALUES (?,?)", [title, content]);

    res.status(201).json({
        success: true,
        message: "berhasil menambahkan artikel",
       data: {
            id: result.insertId,
            title,
            content
        }
    });
});

module.exports = { getArticles, createArticles };
