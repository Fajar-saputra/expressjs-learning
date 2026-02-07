const pool = require("../db/pool");

const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0] || null;
};

const createProduct = async ({ namaBarang, hargaBarang, satuan }) => {
  const [result] = await pool.query(
    "INSERT INTO products (nama_barang, harga_barang, satuan) VALUES (?, ?, ?)",
    [namaBarang, hargaBarang, satuan]
  );

  return {
    id: result.insertId,
    namaBarang,
    hargaBarang,
    satuan,
  };
};

const updateProduct = async (id, { namaBarang, hargaBarang, satuan }) => {
  const [result] = await pool.query(
    "UPDATE products SET nama_barang = ?, harga_barang = ?, satuan = ? WHERE id = ?",
    [namaBarang, hargaBarang, satuan, id]
  );

  return result.affectedRows;
};

const patchProduct = async (id, { namaBarang, hargaBarang, satuan }) => {
  const fields = [];
  const values = [];

  if (namaBarang !== undefined) {
    fields.push("nama_barang = ?");
    values.push(namaBarang);
  }
  if (hargaBarang !== undefined) {
    fields.push("harga_barang = ?");
    values.push(hargaBarang);
  }
  if (satuan !== undefined) {
    fields.push("satuan = ?");
    values.push(satuan);
  }

  if (fields.length === 0) {
    return 0;
  }

  values.push(id);
  const [result] = await pool.query(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return result.affectedRows;
};

const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
