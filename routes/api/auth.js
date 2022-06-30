const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");
const {schemas} = require("../../models/user")

const router = express.Router();

router.post('/signup', validation(schemas.signupSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;