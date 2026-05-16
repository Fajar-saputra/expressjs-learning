const userRepository = require("../repositories/user.repository");

const getById = async (userId) => {
    return userRepository.findById(userId);
};

const getByAll = async () => {
    return userRepository.findAll();
};

const createUser = ({ username, email, password }) => {
    
};
