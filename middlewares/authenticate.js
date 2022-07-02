const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { createError } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");
        console.log(jwt);
        if (bearer !== "Bearer") {
            throw createError(401, "Error here");
        }
        try {
            const { id } = jwt.verify(token, SECRET_KEY);
            console.log(id);
            const user = await User.findById(id);
            if (!user) {
                throw createError(401,  "Error here2");
            }
            req.user = user;
            next()
        } catch (error) {
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error)
    }
};

module.exports = authenticate;