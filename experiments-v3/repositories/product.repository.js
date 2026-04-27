const { db } = require("../config/db");

const findAllWithFilters = async (filters) => {
    const { page, limit, search, minPrice, maxPrice, category } = filters;
    let baseConditions = " WHERE 1=1";
    const params = [];

    if (search) {
        baseConditions += " AND (name LIKE ? OR description LIKE ?)";
        const searchParam = `%${search}%`;
        params.push(searchParam, searchParam);
    }
    if (minPrice !== undefined) {
        baseConditions += " AND price >= ?";
        params.push(minPrice);
    }
    if (maxPrice !== undefined) {
        baseConditions += " AND price <= ?";
        params.push(maxPrice);
    }
    if (category) {
        baseConditions += " AND category = ?";
        params.push(category);
    }

    // Hitung Total
    const [countResult] = await db.execute(`SELECT COUNT(*) as total FROM products ${baseConditions}`, params);
    const total = countResult[0].total;

    // Ambil Data dengan Pagination
    const offset = (page - 1) * limit;
    const [rows] = await db.execute(
        `SELECT * FROM products ${baseConditions} LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    return {
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        rows,
    };
};

const findById = async (id) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
};

const create = async (data) => {
    const { name, price, category, description } = data;
    const [result] = await db.execute(
        "INSERT INTO products (name, price, category, description) VALUES (?, ?, ?, ?)",
        [name, price, category, description]
    );
    return findById(result.insertId);
};

const update = async (id, data) => {
    const { name, price, category, description } = data;
    await db.execute(
        "UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), category = COALESCE(?, category), description = COALESCE(?, description) WHERE id = ?",
        [name ?? null, price ?? null, category ?? null, description ?? null, id]
    );
    return findById(id);
};

const destroy = async (id) => {
    return await db.execute("DELETE FROM products WHERE id = ?", [id]);
};

module.exports = { findAllWithFilters, findById, create, update, destroy };