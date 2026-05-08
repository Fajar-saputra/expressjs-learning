const multer = require("multer");
const { AppError } = require("../utils/AppError");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Tentukan folder penyimpanan
    },
    filename: function (req, file, cb) {
        // Mengambil ekstensi file asli (misal: .jpg atau .png)
        const extension = path.extname(file.originalname);

        // Membuat nama file: fieldname + timestamp + ekstensi
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
        cb(null, uniqueName);
    },
});

const fileSize = {
    limit: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    const fileOk = ["image/jpg", "image/jpeg", "image/png", "image/wbep"];

    if (fileOk.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("Format file tidak diizinkan", 400), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: fileSize,
});

module.exports = upload;
