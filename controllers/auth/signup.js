const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const idGenerate = require('bson-objectid');

const { User } = require('../../models/user')

const { createError, sendMail } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use");
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = idGenerate();
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });
    const mail = {
        to: "email",
        subject: "New user registered",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click here to confirm your email</a>`
    }
    await sendMail(mail);
    res.status(201).json({
        user: {
            email: result.email,
            // name: result.name,
            // subscription: "starter",
           
        }
    })
}

module.exports = signup;