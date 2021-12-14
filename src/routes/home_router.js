const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");


router.get("/", homeController.index);
router.post("/", homeController.find);
router.get("/search/", homeController.findPage);
router.get("/search/:searchTerm", homeController.findPageWithSearchTerm);
router.get("/carikan-saya-hobi", homeController.findRandomHobby);


module.exports = router;