const multer = require("multer");
const path = require("path");
const { appError } = require("../utils/appError");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);

        // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const typeFile = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (typeFile.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(next(new appError("Format image tidak diperbolehkan!", 400)), false);
    }
};

const limits = {
    fileSize: 2 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits });

module.exports = { upload };
