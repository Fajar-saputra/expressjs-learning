const { db } = require("../config/db");

const findAllWithFilters = async (filters) => {
    const { page = 1, limit = 10, search, minPrice, maxPrice, category } = filters;

    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    let countQuery = "SELECT COUNT(*) as total FROM products WHERE 1=1";
    const countParams = [];

    // Search filter
    if (search) {
        const searchCondition = " AND (name LIKE ? OR description LIKE ?)";
        query += searchCondition;
        countQuery += searchCondition;
        const searchParam = `%${search}%`;
        params.push(searchParam, searchParam);
        countParams.push(searchParam, searchParam);
    }

    // Price filters
    if (minPrice !== undefined) {
        query += " AND price >= ?";
        countQuery += " AND price >= ?";
        params.push(minPrice);
        countParams.push(minPrice);
    }

    if (maxPrice !== undefined) {
        query += " AND price <= ?";
        countQuery += " AND price <= ?";
        params.push(maxPrice);
        countParams.push(maxPrice);
    }

    // Category filter
    if (category) {
        query += " AND category = ?";
        countQuery += " AND category = ?";
        params.push(category);
        countParams.push(category);
    }

    // Get total count
    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0].total;

    // Add pagination
    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [rows] = await db.execute(query, params);

    return {
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / limit),
        },
        rows,
    };
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows.length > 0 ? rows[0] : null;
};

const create = async (name, price, description, category, image) => {
    const [result] = await db.execute("INSERT INTO products (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)", [name, price, description, category, image]);

    return {
        id: result.insertId,
        name,
        price,
        description,
        category,
        image,
    };
};

const update = async (name, price, description, category, productId) => {
    const [result] = await db.execute("UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), description = COALESCE(?, description), category=COALESCE(?, category) WHERE id = ?", [
        name,
        price,
        description,
        category,
        productId,
    ]);

    const [update] = await db.execute("SELECT * FROM products WHERE id = ? ", [productId]);

    return update[0];
};

const deleteProduct = async (productId) => {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [productId]);
    return result;
};

module.exports = { findAllWithFilters, findById, create, update, deleteProduct };
