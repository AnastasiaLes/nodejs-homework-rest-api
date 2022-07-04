const {User} = require("../../models/user")
const {createError} = require("../../helpers")

const updateSubscription = async (req, res, next) => {
    const { subscription } = req.body;
    const { _id } = req.user;
    console.log(_id);
    const result = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    if (!result) {
      throw createError(404);
    }
    res.json({
        name: result.name,
        email: result.email,
        subscription: result.subscription
    });
}

module.exports = updateSubscription;