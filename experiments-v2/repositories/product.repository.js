const { db } = require("../config/db");

const findAll = async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows.length > 0 ? rows[0] : null;
};

const create = async (name, price, category, description) => {
    const [result] = await db.execute("INSERT INTO products (name, price, category, description) VALUES (?,?,?,?)", [name, price, category, description]);
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [result.insertId]);
    return rows[0];
};

const update = async (name, price, category, description, productId) => {
    const [result] = await db.execute(
        "UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), category = COALESCE(?, category), description = COALESCE(?, description) WHERE id = ?",
        [name ?? null, price ?? null, category ?? null, description ?? null, productId],
    );

    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);

    return rows[0];
};

const deleteProduct = async (productId) => {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [productId]);
    return result;
};

module.exports = { findAll, findById, create, update, deleteProduct };
