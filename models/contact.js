const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact']
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
});

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.number().required(),
  favorite:Joi.bool()
})

const updateFavorite = Joi.object({
    favorite: Joi.bool().required()
})

const schemas = {
    contactAddSchema,
    updateFavorite,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas
};