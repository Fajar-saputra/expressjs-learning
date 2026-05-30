const fs = require("fs");

const deleteFile = async (filePath) => {
    if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
    }
};

module.exports = { deleteFile };