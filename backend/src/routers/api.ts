import express from 'express';
import hobbyRouter from "./hobby_router";
import homeRouter from "./home_router";
import dashboardRouter from "./dashboard_router";
import categoryRouter from "./category_router";
import suggestionRouter from "./suggestion_router";
import authRouter from "./auth_router";


const router = express.Router();
router.use(homeRouter);
router.use(dashboardRouter);
router.use(hobbyRouter);
router.use(categoryRouter);
router.use(suggestionRouter);
router.use(authRouter);


export default router;