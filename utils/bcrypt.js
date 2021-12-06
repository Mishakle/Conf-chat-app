const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    const hash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

    return hash;
};

exports.isValidPassword = async (password, dbPassword) => {
    const compare = await bcrypt.compare(password, dbPassword);

    return compare;
};
