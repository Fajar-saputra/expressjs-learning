const db = require("../config/db");

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id =?", [productId]);
    return rows[0] || null;
};
const findByName = async (name) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id =?", [name]);
    return rows[0] || null;
};

const findAll = async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows || [];
};

const create = async ({ name, category, description, price, image }) => {
    const [result] = await db.execute("INSERT INTO products (name, category, description, price, image) VALUES (?,?,?,?,?)", [name, category, description, price, image]);
    return result;
};

const update = async (productId, { name, category, description, price, image }) => {
    const [result] = await db.execute(
        `UPDATE  products SET 
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        image = COALESCE(?, image)
        WHERE id = ?`,
        [name ?? null, category ?? null, description ?? null, price ?? null, image ?? null, productId],
    );
    return result;
};

const destroy = async (productId) => {
    return await db.execute("DELETE * FROM users WHERE id = ?", [productId]);
};

module.exports = { findAll, findById, findByName, create, update, destroy };
