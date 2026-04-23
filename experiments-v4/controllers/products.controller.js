const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successRespon, errorRespon } = require("../utils/respon");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [products] = await db.execute("SELECT * from product");

    if (products.length === 0) {
        return successRespon(res, 200, [], "Product masih kosong")
    }

    successRespon(res, products, "Product berhasil diambil", 200);
});

const createProducts = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;
    const [result] = await db.execute(
        "INSERT INTO product (name, price, description) VALUES (?,?,?)", 
        [name, price, description]
    );

    successRespon(res, { id: result.insertId, name }, "Product berhasil ditambahkan", 201);
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;
    const [rows] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successRespon(res, rows[0], "Product berhasil ditemukan", 200);
});

const deleteProducts = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan atau gagal dihapus", 404);
    }

    successRespon(res, null, "Product berhasil dihapus", 200);
});

const updateProducts = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const sql = `
        UPDATE product 
        SET 
        name = COALESCE(?, name), 
        price = COALESCE(?, price), 
        description = COALESCE(?, description) 
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [name || null, price || null, description || null, id]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successRespon(res, null, "Product berhasil diupdate", 200);
});

module.exports = { createProducts, getProducts, getProductById, deleteProducts, updateProducts };