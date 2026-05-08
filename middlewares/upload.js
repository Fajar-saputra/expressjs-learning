const path = require("path");
const { AppError } = require("../utils/AppError");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // 1. Ambil ekstensi asli (misal: .png)
        const ext = path.extname(file.originalname);

        // 2. Buat suffix unik
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        // 3. Gabungkan: fieldname + suffix + ekstensi
        // Hasil: "image-1715162839-928374.png"
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const limits = {
    fileSize: 2 * 1024 * 1024,
    files: 1
};

const fileFilter = (res, file, cb) => {
    const allowed = ["image/jpg", "image/jpeg", "image/png"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("Format file tidak diizinkan", 400), false);
    }
};

const upload = multer({ storage, limits, fileFilter, });

module.exports = { upload };
