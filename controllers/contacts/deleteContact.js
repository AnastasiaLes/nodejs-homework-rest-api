const {Contact} = require("../../models/contact")
const { createError } = require("../../helpers")

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({
message: "Contact deleted"
    })
}

module.exports = deleteContact;