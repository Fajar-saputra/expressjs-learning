const db = require("./db");

const getProducts = async (req, res) => {
    const [products] = await db.query("SELECT * from products");

    res.status(200).json({
        success: true,
        message: "berhasil ambil data product",
        products: products,
    });
};

const createProducts = async (req, res) => {
    const { name, price } = req.body;

    const sql = "INSERT INTO products (name, price) VALUES (?,?)";

    await db.query(sql, [name, price]);

    res.status(201).json({
        success: true,
        data: {
            name,
            price,
        },
    });
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Format ID salah",
        });
    }

    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);

        if (rows.length < 0) {
            return res.status(404).json({
                success: false,
                message: "ID tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            message: `product dengan ID : ${id} ditemukan!`,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan pada internal server",
        });
    }
};

const deleteProducts = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Format ID salah",
        });
    }

    try {
        const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "product tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            message: "product ditemukan",
            data: rows[0],
        });
    } catch (error) {
        return res.status(500).json({
            message: "Terjadi kesalahan internal pada server",
        });
    }
};

const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    try {
        const sql = `
        UPDATE products
        SET
        name = COALESCE(?, name),
        price = COALESCE(?, price)
        WHERE id = ?
        `;

        const [result] = await db.execute(sql, [name, price, id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Product tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product berhasil diupdate",
            data: result,
        });
    } catch (error) {
        console.error("Terjadi error saat update:", error.message);
    }
};

module.exports = { createProducts, getProducts, getProductById, deleteProducts, updateProducts };
