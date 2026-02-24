// const db = require('../')
// const AppError = require('../utils/AppError')
// const asyncHandler = require('../utils/asyncHandler')

// exports.getAllArticles =asyncHandler( async(req, res) => {
//     // const [result] = await
// })

const getArtile = (req, res) => {
    res.status(200).json({
        message: "berhasil ambil semua artikel"
    })
}

const createArticle = (req, res) => {
    const { namaBuku, penerbit, tahun, genre } = req.body;

    res.status(201).json({
        message: "artikel baru sudah ditambahkan!",
        data: {
            namaBuku, penerbit, tahun, genre
        }
    })
}

const deleteArticle = (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        message: `berhasil menghapus buku dengan ID: ${id}`
    })
}

const updateArticle = (req, res) => {
    const { id } = req.params
    const { penerbit } = req.body;

    res.status(200).json({
        message: `article dengan ID : ${id} diubah penerbit: ${penerbit}`
    })
}
 
module.exports = {getArtile, createArticle,deleteArticle, updateArticle}