const notFound = (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Url ${req.originalUrl} dengan method ${req.method} tidak ditemukan di server ini!`,
    });
};

module.exports = {notFound}