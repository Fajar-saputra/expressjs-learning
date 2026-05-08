const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/appError');
const {asyncHandlerv1} = require('../utils/asyncHandler')

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Kamu belum login! Silakan login untuk akses.', 401));
  }

  // Verifikasi token
  try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return next(new AppError('Token tidak valid atau kadaluwarsa', 401));
  }
  
};

module.exports = { protect };