const { User } = require('../../models/user')


const bcrypt = require('bcryptjs');

// const hashInvoke = async (password) => {
//     const hashPassword = await bcrypt.hash(password, 10);
//     const compareResult = await bcrypt.compare(password, hashPassword)
//     console.log(compareResult);
// }

// hashInvoke('123456');


const { createError } = require('../../helpers');

const signup = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashPassword})
    // const compareResult = await bcrypt.compare(password, hashPassword);
    
    res.status(201).json({
        user: {
            email: result.email,
            name: result.name,
            subscription: "starter"
        }
    })
}

module.exports = signup;