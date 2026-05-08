const { db } = require("../config/db");

const findAll = async (reqQuery) => {
    let { page, limit } = reqQuery;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM products LIMIT ? OFFSET ?`;
    const values = [limit, offset]
    const [products] = await db.execute(sql, [Number(limit), Number(offset)]);
    return products;
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows[0] || null;
};

const create = async ({ name, price, category, description, image }) => {
    const [result] = await db.execute("INSERT INTO products (name, price,category ,description, image) VALUES (?,?,?,?,?)", [name, price, category, description, image]);
    return findById(result.insertId);
};

const update = async (productId, { name, price, category, description,image } ) => {

    const sql = `
    UPDATE products
    SET
    name = COALESCE(?, name),
    price = COALESCE(?, price),
    category = COALESCE(?, category),
    description = COALESCE(?, description),
    image = COALESCE(?, image)
    WHERE id = ?
    `;
    await db.execute(sql, [name, price, category, description, image, productId]);

    return findById(productId);
};

const destroy = async (productId) => {
    return await db.execute("DELETE FROM products WHERE id = ?", [productId]);
};

module.exports = { findAll, findById, create, update, destroy };
