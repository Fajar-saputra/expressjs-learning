const { db } = require("../config/db");

const findAll = async (reqQuery) => {
    let { page = 1, limit = 10 } = reqQuery;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM products LIMIT ? OFFSET ?`;
    let values = [limit, offset];
    const [products] = await db.execute(sql, [Number(limit), Number(offset)]);
    return products;
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows[0]
};

const create = async (productData) => {
    const { name, price, category, description } = productData;
    const [result] = await db.execute("INSERT INTO products (name, price,category ,description) VALUES (?,?,?,?)", [name, price, category, description]);

    return findById(result.insertId);
};

const update = async (productData, productId) => {
    const { name, price, category, description } = productData;

    const sql = `
    UPDATE products
    SET
    name = COALESCE(?, name),
    price = COALESCE(?, price),
    category = COALESCE(?, category),
    description = COALESCE(?, description)
    WHERE id = ?
    `;
    await db.execute(sql, [name, price, category, description, productId]);

    return findById(productId);
};

const destroy = async (productId) => {
    return await db.execute("DELETE FROM products WHERE id = ?", [productId]);
}

module.exports = { findAll, findById, create, update, destroy };
