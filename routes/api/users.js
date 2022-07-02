const express = require('express');
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

module.exports = router;