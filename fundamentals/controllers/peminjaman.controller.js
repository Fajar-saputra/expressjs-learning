const borrowBook = asyncHandler(async (req, res) => {
    const { book_id } = req.body;
    const user_id = req.user.id; // Diambil dari token

    // Cek stok buku
    const [book] = await db.execute("SELECT stok FROM books WHERE id = ?", [book_id]);
    if (book[0].stok <= 0) throw new AppError("Stok buku habis!", 400);

    // Insert Peminjaman (Durasi 7 hari)
    await db.execute(
        "INSERT INTO peminjaman (user_id, book_id, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))",
        [user_id, book_id]
    );

    // Update stok buku
    await db.execute("UPDATE books SET stok = stok - 1 WHERE id = ?", [book_id]);

    res.status(201).json({ success: true, message: "Buku berhasil dipinjam!" });
}); 