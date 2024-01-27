const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const verifyPassword = async (plain) => {
    const isMatch = await bcrypt.compare(plain, this.password);
    if (!isMatch){
        throw new Error('incorrect pasword');
    }

    // return bcrypt.compare(plain, this.password);
};

module.exports = { hashPassword, verifyPassword };
