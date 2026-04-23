const db = require("../config/db");
const { AppError } = require("../utils/appError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successResponse } = require("../utils/response");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM product");

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "Data products masih kosong!",
            data: [],
        });
    }

    // res.status(200).json({
    //     success: true,
    //     message: "Data berhasil diambil",
    //     data: rows,
    // });

    successResponse(res, rows, "Berhasil ambil data", 200)
});

const getProductByID = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id).length === 0) {
        throw new Error("Format ID tidak valid", 400);
    }

    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: `Berhasil ambil data product by ID ${id}`,
        data: rows[0],
    });
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;

    const [result] = await db.execute("INSERT INTO product (name, price, description) VALUES (?,?,?)", [name, price, description]);

    successResponse(res, result, "Berhasil ambil data product", 201)

    // res.status(201).json({
    //     success: true,
    //     message: "Berhasil create product",
    //     data: result,
    // });
});

const updateProduct = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;
    const { id } = req.params;

    const [result] = await db.execute(
        "UPDATE product SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description) WHERE id = ?", 
        [name || null, price || null, description || null, id]
    );

    // Cek apakah ada baris yang berubah
    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan atau tidak ada perubahan", 404);
    }

    res.status(200).json({
        success: true,
        message: "Berhasil update product",
    });
});

const deleteProductByID = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;

    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new AppError("Product gagal dihapus atau tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: `Berhasil hapus product ID ${id}`,
    });
});

module.exports = { getProducts, createProducts, getProductByID, deleteProductByID, updateProduct };
