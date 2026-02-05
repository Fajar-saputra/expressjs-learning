exports.getUser = (req, res) => {
    res.send(`Ambil user`)
}

exports.createUser = (req, res) => {
    const { nama, umur } = req.body;
    res.send(`User ${nama} ${umur} berhasil dibuat!`)
}

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { nama, umur } = req.body;
    res.send(`Nama ${nama} dan umur ${umur} berhasil update!`)
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    res.send(`User id ${id}`)
}