const express = require('express');
const router = express.Router();

const homeRouter = require("./home_router.js");
const hobbyRouter = require("./hobby_router.js");
const categoryRouter = require("./category_router.js");
const suggestionRouter = require("./suggestion_router.js");
const dashboardRouter = require("./dashboard_router.js");
const authRouter = require("./auth_router.js");


router.use(homeRouter);
router.use(hobbyRouter);
router.use(categoryRouter);
router.use(suggestionRouter);
router.use(dashboardRouter);
router.use(authRouter);


module.exports = router;