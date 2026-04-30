const { db } = require("../config/db");
// format query sql kita Susu Fufufafa Wajib Ganti, Hari Order Libur
// SELECT * FROM produk        -- (S)usu (F)ufufafa
// WHERE 1 = 1                 -- (W)ajib (Mulai filter)
//   AND nama LIKE '%sepatu%'  -- (W)ajib (Kriteria 1)
//   AND category = 'sport'    -- (W)ajib (Kriteria 2)
// ORDER BY harga DESC         -- (H)ari (O)rder
// LIMIT 10 OFFSET 0;          -- (L)ibur

const findAllWithFilters = async (filters) => {
    // ambil data dari query
    let { page = 1, limit = 10, search = "", category = "", sortBy = "id", order = "ASC" } = filters;

    // konversi data
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * 10;

    // query utama
    let sql = "SELECT * FROM products WHERE 1=1";
    let values = [];

    // logika search
    if (search) {
        sql += " AND name LIKE ?";
        values.push(`%${search}%`);
    }
    // logika category
    if (category) {
        sql += " AND category = ?";
        values.push(category);
    }

    // clear sorting
    const validColomn = ["id", "name", "price"];
    const validOrder = ["ASC", "DESC"];
    if (!validColomn.includes(sortBy)) sortBy = "id";
    if (!validOrder.includes(order)) order = "ASC";

    sql += ` ORDER BY ${sortBy} ${order}`;

    // logika limti
    sql += " LIMIT ? OFFSET ?";
    values.push(limit, offset);

    // GABUNG
    const [rows] = await db.execute(sql, values);

    // total halaman
    let countSql = "SELECT COUNT(*) AS total FROM products WHERE 1=1 ";
    let countParams = [];

    if (search) {
        countSql += " AND name LIKE ?";
        countParams.push(`%${search}%`);
    }

    if (category) {
        countSql += " AND category = ?";
        countParams.push(category);
    }

    // gabung
    const [countResult] = await db.execute(countSql, countParams);
    const total = countResult[0].total;

    // respon

    return {
        pagination: {
            totalItem: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            itemPerPage: limit,
        },
        data: rows,
    };
};

const findById = async (productId) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [productId]);
    return rows[0];
};

const create = async (productData) => {
    const { name, price, category, description } = productData;
    const [result] = await db.execute("INSERT INTO products (name, price,category, description) VALUES (?,?,?,?)", [name, price, category, description]);

    return findById(result.insertId);
};

module.exports = { findAllWithFilters, findById, create };
