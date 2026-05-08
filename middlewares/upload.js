const multer = require("multer");
const path = require("path");
const {AppError} = require("../utils/AppError");

// storage (disk)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});

// filter file (hanya image)
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("File harus berupa gambar", 400), false);
    }
};

// limit ukuran (misal 2MB)
const limits = {
    fileSize: 2 * 1024 * 1024
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;