const { db } = require("../config/db");
const { asyncHandlerv1 } = require("../utils/asyncHandler");

const getProductAllPagination = asyncHandlerv1(async (req, res) => {
    try {
        // 1. Ambil data dari req.query (bukan params)
        let { page = 1, limit = 10, search = "", category = "", sortBy = "id", order = "ASC" } = req.query;

        // 2. Konversi tipe data
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        // 3. Query Utama
        let sql = "SELECT * FROM product WHERE 1 = 1 ";
        let params = [];

        if (search) {
            sql += " AND name LIKE ?";
            params.push(`%${search}%`);
        }

        if (category) {
            sql += " AND category = ?";
            params.push(category);
        }

        // White-listing
        const validColumn = ["id", "name", "price"];
        const validOrder = ["ASC", "DESC"];
        if (!validColumn.includes(sortBy)) sortBy = "id";
        if (!validOrder.includes(order.toUpperCase())) order = "ASC";

        sql += ` ORDER BY ${sortBy} ${order}`;
        
        // Perbaikan Sintaks LIMIT OFFSET
        sql += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);

        const [rows] = await db.execute(sql, params);

        // 4. Hitung Total Data (untuk pagination)
        let countSql = "SELECT COUNT(*) as total FROM product WHERE 1 = 1";
        let countParams = [];

        if (search) {
            countSql += " AND name LIKE ?";
            countParams.push(`%${search}%`);
        }

        if (category) {
            countSql += " AND category = ?";
            countParams.push(category);
        }

        const [countResult] = await db.execute(countSql, countParams);
        const total = countResult[0].total;

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = { getProductAllPagination };