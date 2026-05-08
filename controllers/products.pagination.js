const { asyncHandlerv1 } = require("../utils/asyncHandler");
const { db } = require("../config/db");

// format query sql kita Susu Fufufafa Wajib Ganti, Hari Order Libur
// SELECT * FROM produk        -- (S)usu (F)ufufafa
// WHERE 1 = 1                 -- (W)ajib (Mulai filter)
//   AND nama LIKE '%sepatu%'  -- (W)ajib (Kriteria 1)
//   AND category = 'sport'    -- (W)ajib (Kriteria 2)
// ORDER BY harga DESC         -- (H)ari (O)rder
// LIMIT 10 OFFSET 0;          -- (L)ibur

const getPagination = asyncHandlerv1(async (req, res) => {
    let { page = 1, limit = 10, search = "", category = "", sortBy = "id", order = "ASC" } = req.query;

    // konversi data
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    // query utama
    let sql = "SELECT * FROM products WHERE 1 = 1 ";
    let values = [];

    // fitur
    if (search) {
        sql += " AND search LIKE ? ";
        values.push(`%${search}%`);
    }

    if (category) {
        sql += " AND category = ? ";
        values.push(category);
    }

    // white-
    const validColomn = ["id", "price", "category"];
    const validOrder = ["ASC", "DESC"];

    if (!validColomn.includes(sortBy)) sortBy = "id";
    if (!validOrder.includes(order)) order = "ASC";

    sql += ` ORDER BY ${sortBy} ${order}`;

    sql += " LIMIT ? OFFSET ? ";
    values.push(limit, offset);

    // gabung
    const [rows] = await db.execute(sql, values);

    // hitung total page
    let countSql = "SELECT COUNT(*) AS total FROM products WHERE 1=1 ";
    let countValues = [];

    if (search) {
        countSql += " AND search LIKE ?";
        countValues.push(`%${search}%`);
    }

    if (category) {
        countSql += " AND category = ?";
        countValues.push(category);
    }

    const [countResult] = await db.execute(countSql, countValues);
    const total = countResult[0].total;

    console.log("Data yang akan dikirim:", {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    });

    res.status(200).json({
        success: true,
        pagination: {
            totalItem: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            itemPerPage: limit,
        },
        data: rows,
    });
});

module.exports = { getPagination };
