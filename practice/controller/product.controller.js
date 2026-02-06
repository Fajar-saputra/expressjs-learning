exports.getProduct = (req, res) => {
    res.send("ambil data product")
}

exports.addProduct = (req, res) => {
    const { namaBarang, hargaBarang } = req.body;

    res.status(201).json({
        success: true,
        message: "Product berhasil ditambahkan!!",
        data: {
            namaBarang, hargaBarang
        }
    })
}