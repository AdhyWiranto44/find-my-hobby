const express = require('express');
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");


router.get("/admin/dashboard", DashboardController.index);


module.exports = router;