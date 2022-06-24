const contacts = require("../../models/contacts")
const {createError} = require("../../helpers")
const {contactAddSchema} = require("../../schemas/contacts")

const addContact = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field")
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

module.exports = addContact;