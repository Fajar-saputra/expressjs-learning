// exports.getProfile = (req, res) => {
//   res.send("Ambil profile");
// };

// exports.createProfile = (req, res) => {
//   const { nama, bio } = req.body;
//   res.send(`Berhasil membuat profile ${nama}, bio ${bio}`);
// };

// exports.updateProfile = (req, res) => {
//   const { id } = req.params;
//   const { nama, bio } = req.body;
//   res.send(`Profile ${id} diupdate: ${nama}, bio ${bio}`);
// };

// exports.deleteProfile = (req, res) => {
//   const { id } = req.params;
//   res.send(`Profile dengan id ${id} berhasil dihapus`);
// };

// standar industri
exports.getProfile = (req, res) => {
    res.status(200).json({
        success: true,
        message: "berhasil ambil data profile",
        data: []
    })
}

exports.createProfile = (req, res) => {
    const { username, nama, bio, foto } = req.body;

    res.status(201).json({
        success: true,
        message: "Berhasil dibuat",
        data: {
            username,
            nama,
            bio,
            foto
        }
    })
}

exports.updateProfile = (req, res) => {
    const { id } = req.params;
    const { username, nama, bio, foto } = req.body;

    res.status(200).json({
        success: true,
        message: `ID ${id} berhasil update`,
        data: {
            username, nama, bio, foto
        }
    })
}

exports.deleteProfile = (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        success: true,
        message: `ID ${id} berhasil di hapus`
    })
}
