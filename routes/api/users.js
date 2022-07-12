const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require("../../helpers");
const { authenticate, upload } = require('../../middlewares');

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;