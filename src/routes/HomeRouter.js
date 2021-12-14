const express = require('express');
const router = express.Router();
const HomeController = require("../controllers/HomeController");


router.get("/", HomeController.index);
router.post("/", HomeController.find);
router.get("/search/", HomeController.findPage);
router.get("/search/:searchTerm", HomeController.findPageWithSearchTerm);
router.get("/carikan-saya-hobi", HomeController.findRandomHobby);


module.exports = router;