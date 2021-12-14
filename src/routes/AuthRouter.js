const express = require('express');
const router = express.Router();
const AuthController = require("../controllers/AuthController");


router.get("/auth/login", AuthController.index);
router.post("/auth/login", AuthController.login);
router.get("/auth/logout", AuthController.logout);


module.exports = router;