const db = require("../config/db");
const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM product');

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Data products masih kosong!",
            data : []
        })
    }

    res.status(200).json({
        success: true,
        message: "Data berhasil diambil",
        data: rows
    })
})

module.exports = {getProducts}