const { AppError } = require("../utils/AppError");
const { asyncHandlerv2 } = require("../utils/asyncHandler");
const { db } = require("../config/db");
const { successRespon, errorRespon } = require("../utils/respon");

const getProducts = asyncHandlerv2(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM product");

    if (rows.length === 0) {
        throw new AppError("Data product kosong", 404);
    }
    successRespon(res, rows, "Data product berhasil diambil");
});

const getProductById = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError("product tidak ditemukan", 404);
    }

    successRespon(res, rows, "Data product berhasil diambil");
});

const createProduct = asyncHandlerv2(async (req, res) => {
    const { name, description, price } = req.body;

    const [result] = await db.execute("INSERT INTO product (name, description, price) VALUES (?,?,?)", [name, description || null, price]);

    successRespon(res, { id: result.insertId, name, price, description }, "Data product berhasil ditambah", 201);
});

const deleteProduct = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;

    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new Error("Product tidak ditemukan", 404);
    }

    successRespon(res, null, "Data product berhasil dihapus");
});

const updateProduct = asyncHandlerv2(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // ubah data
    const [result] = await db.execute("UPDATE  product SET name = COALESCE(?, name), description =COALESCE(?, description), price= COALESCE(?, price)", [
        name || null,
        description || null,
        price || null,
    ]);

    if (result.affectedRows === 0) {
        throw new Error("Product tidak ditemukan", 404);
    }

    successRespon(res, result, "Data product berhasil diambil");
});

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
