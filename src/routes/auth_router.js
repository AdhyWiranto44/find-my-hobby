const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth_controller");


router.get("/auth/login", authController.index);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);


module.exports = router;