const userRepository = require("../repositories/user.repository");
const { AppError } = require("../utils/appError");

const getUsers = async () => {
    return userRepository.findAll();
};

const getUser = async (userId) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError("User tidak ditemukan", 404);
    return user;
};

const createUser = async ({ username, email, password }) => {
    const userExisting = await userRepository.findByEmail(email);

    if (userExisting) throw new AppError("User sudah ada", 404);

    const user = await userRepository.create(username, email, password);

    return user;
};

const updateUser = async (updateData, userId) => {
    const { username, email, password } = updateData;
    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User tidak ditemukan", 404);

    await userRepository.update(username, email, password);

    return user;
};

const deleteUser = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) throw new AppError("User tidak ditemukan", 404);

    await userRepository.destroy(userId);

    return null;
};

module.exports = { getUser, getUsers, createUser, deleteUser };
