const User = require('../models/UserModels.js')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')

async function login({ username, password }) {
    const user = await User.findOne({ email: username });
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return { ...user.toJSON(), token }
        } else {
            return null;
        }
    } else {
        return null;
    }
}

async function register(params) {
    const user = new User(params)
    await user.save();
    return user;
}

async function getById(id) {
    const user = await User.findById(id);
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getById
};