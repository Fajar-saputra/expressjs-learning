const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppErr = require('../utils/appError');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppErr('Kamu belum login! Silakan login untuk akses.', 401));
  }

  // Verifikasi token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan id user ke request agar bisa dipakai nanti
    next();
  } catch (err) {
    return next(new AppErr('Token tidak valid atau kadaluwarsa', 401));
  }
});

module.exports = { protect };