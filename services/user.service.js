const userRepository = require('../repositories/user.repository');
const { AppError } = require('../utils/AppError');

const getAllUser = async () => {
    return await userRepository.findAll();
}

const getById = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) {
        throw new AppError(`User dengan ID ${userId} tidak ditemukan`, 404);
    }
    return user;
};

const getByEmail = async (userEmail) => {
    const user = await userRepository.findByEmail(userEmail);
    if (!user) {
        throw new AppError(`User dengan email ${userEmail} tidak ditemukan`, 404);
    }
    return user;
};

const createUser = async (userData) => {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
        throw new AppError("Email sudah digunakan", 400);
    }
    return await userRepository.create(userData);
};

const updateUser = async (userId, userData) => {
    await getById(userId); 
    return await userRepository.update(userId, userData);
};

const deleteUser = async (userId) => {
    await getById(userId);
    return await userRepository.destroy(userId);
};

module.exports = { 
    getAllUser, 
    getById, 
    getByEmail, 
    createUser, 
    updateUser, 
    deleteUser 
};