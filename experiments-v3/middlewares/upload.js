const multer = require("multer");
const { AppError } = require("../utils/appError");
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const limits = {
    fileSize: 2 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError("File harus berupa image", 400), false);
    }
};

const upload = multer({ storage, limits, fileFilter })

module.exports = upload
