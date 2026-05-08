exports.getUsers = (req, res) => {
    res.status(200).json({
        message: "ada"
    })
}

exports.getMyProfile = (req, res) => {
    res.status(200).json({
        message: "ambil profile user"
    })
}


exports.getAllUsers = (req, res) => {
    res.status(200).json({
        message: "ambil semua user"
    })
}