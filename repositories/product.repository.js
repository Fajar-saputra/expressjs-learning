const { db } = require("../config/db");

const findAll = async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
};

const findAllWithFilters = async (filter) => {
    const { page = 1, limit = 10, search, minPrice, maxPrice, category } = filter;

    let query = "SELECT * FROM products WHERE 1=1";
    let countQuery = "SELECT COUNT(*) AS total FROM products WHERE 1=1";
    const params = [];
    const countParams = [];

    if (search) {
        const condition = " AND name LIKE ?"; // Asumsi kolomnya 'name'
        query += condition;
        countQuery += condition;
        params.push(`%${search}%`);
        countParams.push(`%${search}%`);
    }

    if (minPrice !== undefined) {
        const condition = " AND price >= ?"; 
        query += condition;
        countQuery += condition;
        params.push(minPrice);
        countParams.push(minPrice);
    }

    // Perhatikan spasi sebelum LIMIT
    const offset = (page - 1) * limit; 
    query += " LIMIT ? OFFSET ?"; 
    params.push(parseInt(limit), offset);

    const [rows] = await db.execute(query, params);
    const [countResult] = await db.execute(countQuery, countParams);
    
    const total = countResult[0].total;

    return {
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalItems: total,
            totalPage: Math.ceil(total / limit)
        },
        rows
    };
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows.length > 0 ? rows[0] : null;
};

const create = async ({name, price, category, description, image}) => {
    const [result] = await db.execute("INSERT INTO products (name, price, category, description, image) VALUES (?,?,?,?,?)", [name, price, category, description, image]);
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [result.insertId]);
    return rows[0];
};

const update = async (productId, {name, price, category, description, image}) => {
    const [result] = await db.execute(
        "UPDATE products SET name = COALESCE(?, name), price = COALESCE(?, price), category = COALESCE(?, category), description = COALESCE(?, description), image=COALESCE(?, image) WHERE id = ?",
        [name ?? null, price ?? null, category ?? null, description ?? null,image??null, productId],
    );

    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);

    return rows[0];
};

const deleteProduct = async (productId) => {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [productId]);
    return result;
};

module.exports = { findAll, findById, create, update, deleteProduct, findAllWithFilters };
