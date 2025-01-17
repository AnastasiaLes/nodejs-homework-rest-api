const express = require('express')

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { authenticate, validation, isValidId } = require("../../middlewares");

const {schemas} = require('../../models/contact')

const router = express.Router()


router.get('/', authenticate, ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', authenticate, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', isValidId, validation(schemas.contactAddSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrl.updateFavorite));

module.exports = router
