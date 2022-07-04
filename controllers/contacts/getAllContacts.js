const {Contact} = require("../../models/contact")

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "-__v", { skip, limit: Number(limit) })
    .sort("name")
    .populate("owner", "name email");
  res.json(result);
}

module.exports = getAllContacts;