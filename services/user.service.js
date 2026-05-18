const userRepository = require("../repositories/user.repository");
const bcrypt = require('bcrypt')

const getByAll = async () => {
    return userRepository.findAll();
};

const getById = async (userId) => {
    return userRepository.findById(userId);
};

const getByEmail = async (email) => {
    return userRepository.findById(email);
};

const createUserByAdmin = async ({ username, email, password, role }) => {
    const user = await userRepository.findByEmail(email);
    if (user) throw new appError("User sudah register!", 400);

    const hashpassword =await bcrypt.hash(password, 10);

    await userRepository.create({ username, email, password:hashpassword, role });

    return { username, email, role };
};

const deleteUser = async (userId) => {
    return userRepository.destroy(userId);
};

const updateUser = async ({ username, email, password }) => {
    const [result] = await userRepository.create({ username, email, password });
};

module.exports = { getByAll, getById, getByEmail, createUserByAdmin, deleteUser, updateUser };
