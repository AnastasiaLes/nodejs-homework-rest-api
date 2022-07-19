const signup = require('./signup');
const verifyEmail = require('./verifyEmail');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubsctiption');
const updateAvatar = require('./updateAvatar');
const resendVerifyEmail = require('./resendVerifyEmail');

module.exports = {
    signup,
    verifyEmail,
    resendVerifyEmail,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
}