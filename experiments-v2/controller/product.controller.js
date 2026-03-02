const appError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const pool = require("../config/db");

const getProducts = asyncHandler(async (req, res) => {
    const [rows] = await pool.execute("SELECT * FROM product");

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            message: "data product masih kosong!!",
            data: [],
        });
    }

    res.status(200).json({
        success: true,
        message: "berhasil ambil data product",
        data: rows,
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [rows] = await pool.execute("SELECT * FROM product WHERE id = ?", [id]);

    if (rows.length === 0) {
        throw new appError("product tidak ditemukan", 404);
    }

    res.status(200).json({
        success: true,
        message: "data berhasil diambil",
        data: rows,
    });
});

const createProduct = asyncHandler(async (req, res) => { 
    const { name, description, price } = req.body;

    if (!name || price === undefined ) {
        return res.status(400).json({
            success: false,
            message: "name, price, wajib diisi"
        });
    }

    const [result] = await pool.execute(
        "INSERT INTO product (name, description, price) VALUES (?,?,?)",
        [name, description || null, price]
    );

    res.status(201).json({
        success: true,
        message: "berhasil membuat product baru!",
        data: {
            id: result.insertId,
            name,
            description,
            price,
        },
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // cek id
    const [rows] = await pool.execute('SELECT * FROM product WHERE id = ? ', [id])

    if (rows.length === 0) {
        throw new appError("ID tidak ditemukan!", 404)
    }

    const [result] = await pool.execute("DELETE FROM product WHERE id = ?", [id])

    res.status(200).json({
        success: true,
        message: `berhasil menghapus product ID: ${id}`
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // cek data ada tidak?
    const [rows] = await pool.execute('SELECT * FROM product WHERE id = ?', [id])

    if (rows.length === 0) {
        throw new appError("product tidak ditemukan", 404)
    }

    // ubah data
    const [result] = await pool.execute('UPDATE  product SET name = COALESCE(?, name), description =COALESCE(?, description), price= COALESCE(?, price)', [name || null, description || null, price || null])

    res.status(200).json({
        success: true,
        message: `berhasil update ID: ${id}`,
        changed: result.changedRows > 0
    })
})

module.exports = { getProducts, getProductById, createProduct, deleteProduct, updateProduct };
