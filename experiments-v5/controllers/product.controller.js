const { db } = require("../config/db");
const { AppError } = require("../utils/AppError");
const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { successRespon, errorRespon } = require("../utils/respon");

const getProducts = asyncHandlerv1(async (req, res) => {
    const [rows] = await db.execute("SELECT * FROM product");

    if (rows.length === 0) {
        return successRespon(res, [], "Data Product masih kosong");
    }

    successRespon(res, rows, "Data Product berhasil diambil");
});

const getProductById = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);

    if (result.length === 0) {
        throw new AppError("Product tidak ditemukan", 404);

        // return errorRespon(res, null, "Product tidak ditemukan", 404)
    }

    successRespon(res, result[0], "Product berhasil ditemukan");
});

const createProduct = asyncHandlerv1(async (req, res) => {
    const { name, price, description } = req.body;

    const [result] = await db.execute("INSERT INTO product (name, price, description) VALUES (?,?,?)", [name, price, description]);

    successRespon(res, { id: result.insertId, name, price, description }, "Product berhasil dibuat", 201);
});

const deleteProduct = asyncHandlerv1(async (req, res) => {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successRespon(res, null, "Product berhasil dihapus");
});

const updateProduct = asyncHandlerv1(async (req, res) => {
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
    const [result] = await db.execute(sql, [name, price, description, id]);

    if (result.affectedRows === 0) {
        throw new AppError("Product tidak ditemukan", 404);
    }

    successRespon(res, null, "Product berhasil diupdate", 200);
});

module.exports = {getProductById, getProducts, createProduct, updateProduct, deleteProduct}
