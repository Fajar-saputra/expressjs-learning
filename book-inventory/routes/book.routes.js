const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

const express = require("express");
const router = express.Router();

const { getBooks, createBook, updateBook, deleteBook } = require("../controllers/book.controller");

// semua user boleh lihat buku
router.get("/books", protect, getBooks);

// admin only
router.post("/books", protect, authorize("admin"), createBook);
router.put("/books/:id", protect, authorize("admin"), updateBook);
router.delete("/books/:id", protect, authorize("admin"), deleteBook);

module.exports = router;
