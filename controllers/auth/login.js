const { createError } = require('../../helpers');
const { User } = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const compareResult = await bcrypt.compare(password, user.password);
    if (!user || !compareResult) {
        throw createError(401, "Email or password is wrong")
    }
    if (!user.verify) {
        throw createError(401, "Email not verify")

    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token
    })
}

module.exports = login;