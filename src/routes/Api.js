const express = require('express');
const router = express.Router();

const homeRouter = require("./home_router");
const hobbyRouter = require("./hobby_router");
const categoryRouter = require("./category_router");
const suggestionRouter = require("./suggestion_router");
const dashboardRouter = require("./dashboard_router");
const authRouter = require("./auth_router");


router.use(homeRouter);
router.use(hobbyRouter);
router.use(categoryRouter);
router.use(suggestionRouter);
router.use(dashboardRouter);
router.use(authRouter);


module.exports = router;