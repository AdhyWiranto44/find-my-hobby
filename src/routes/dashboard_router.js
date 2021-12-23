const express = require('express');
const router = express.Router();
const dashboardController = require("../controllers/dashboard_controller.js");


router.get("/admin/dashboard", dashboardController.index);


module.exports = router;