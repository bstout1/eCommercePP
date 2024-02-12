const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();

module.exports = class AuthService{

    async register(data) {
        const { email } = data;

        try {
            const user = await UserModelInstance.findOneByEmail(email);
            if (user) {
                throw createError(409, 'Email already in user');
            }
            return await UserModelInstance.create(data);
        } catch(err) {
            throw createError(500, err);
        }
    };

    async login(data) {
        const {email, password } = data;

        try {
            const user = await UserModelInstance.findOneByEmail(email);
            if (!user) {
                throw createError(401, 'Incorrect username or password');
            }

            if (user.password !== password) {
                throw createError(401, 'Incorrect username or password');
            }
            return user;
        } catch(err) {
            throw createError(500, err);
        }
    };
}