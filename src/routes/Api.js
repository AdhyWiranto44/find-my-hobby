const express = require('express');
const router = express.Router();

const HomeRouter = require("./HomeRouter");
const CategoryRouter = require("./CategoryRouter");
const SuggestionRouter = require("./SuggestionRouter");
const DashboardRouter = require("./DashboardRouter");
const AuthRouter = require("./AuthRouter");


router.use(HomeRouter);
router.use(CategoryRouter);
router.use(SuggestionRouter);
router.use(DashboardRouter);
router.use(AuthRouter);


module.exports = router;