const express = require('express');
const router = express.Router();
const userController = require("../controller/user");

router.post('/register',userController.createAccount);
router.post('/login',userController.authenticate);

module.exports = router;