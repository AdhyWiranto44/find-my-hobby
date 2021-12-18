const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");


router.get("/", homeController.index);
router.get("/search", homeController.find);
router.get("/carikan-saya-hobi", homeController.findRandomHobby);


module.exports = router;