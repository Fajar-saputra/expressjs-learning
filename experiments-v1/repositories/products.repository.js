const { db } = require("../config/db");

const findAll = async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows.length > 0 ? rows[0] : null;
};

const create = async (name, price, description, category) => {
    const [result] = await db.execute("INSERT INTO products (name, price, description, category) VALUES (?, ?, ?, ?)", [name, price, description, category]);

    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [result.insertId]);

    return rows[0];
};

const update = async (name, price, description, category, productId) => {
    const [result] = await db.execute("UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description), category=COALESCE(?, category) WHERE id = ?", [
        name,
        price,
        description,
        category,
        productId,
    ]);


    const [update] =  await db.execute('SELECT * FROM products WHERE id = ? ', [productId])

    return update[0];
};

const deleteProduct = async (productId) => {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [productId]);
    return result;
};

module.exports = { findAll, findById, create, update, deleteProduct };
