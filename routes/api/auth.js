const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require("../../helpers");

const { validation, authenticate } = require("../../middlewares");
const {schemas} = require("../../models/user")

const router = express.Router();

router.post('/signup', validation(schemas.signupSchema), ctrlWrapper(ctrl.signup));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', validation(schemas.emailSchema), ctrlWrapper(ctrl.resendVerifyEmail));
router.post('/login', validation(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));
router.patch('/:userId/subscription', authenticate,ctrlWrapper(ctrl.updateSubscription));



module.exports = router;