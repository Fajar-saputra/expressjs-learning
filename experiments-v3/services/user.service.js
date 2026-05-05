const userRepository = require("../repositories/user.repository");
const { AppError } = require("../utils/appError");
const bcrypt = require("bcryptjs");

const getUser = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User tidak ditemukan", 404);

    return user;
};

const getUsers = async () => {
    return userRepository.getAll();
};

const createUser = async ({ username, email, password }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create(username, email, hashPassword);
    return user;
};

const updateUser = async (userData, userId) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError("User tidak ditemukan", 404);

    const updatedData = { ...userData };

    if (userData.password) {
        updatedData.password = await bcrypt.hash(userData.password, 10);
    }

    await userRepository.update(userId, updatedData);

    return await userRepository.findById(userId);
};

const deleteUser = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User tidak ditemukan", 404);

    await userRepository.destroy(userId);

    return null;
};

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser };
