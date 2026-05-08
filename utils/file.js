const fs = require("fs").promises;
const path = require("path");

const deleteFile = async (filePath) => {
    try {
        // 1. Cek apakah filePath ada isinya
        if (!filePath) return;

        // 2. Gunakan path.resolve untuk memastikan lokasi file benar secara absolut
        const absolutePath = path.resolve(filePath);

        // 3. Langsung coba hapus tanpa existsSync (LFR - Look Before You Leap vs EAFP)
        // Dalam operasi file, langsung mencoba lebih efisien karena kondisi file bisa berubah cepat
        await fs.unlink(absolutePath);
        
        console.log(`File berhasil dihapus: ${absolutePath}`);
    } catch (error) {
        // 4. Tangani error spesifik jika file tidak ditemukan (ENOENT)
        if (error.code === 'ENOENT') {
            console.warn("File tidak ditemukan, mungkin sudah dihapus.");
        } else {
            // Error lain seperti permission (EPERM) atau folder
            console.error("Gagal menghapus file:", error.message);
            throw error; // Lempar kembali jika itu error serius
        }
    }
};

module.exports = { deleteFile };