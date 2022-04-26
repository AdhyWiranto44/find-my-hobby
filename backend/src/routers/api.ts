import express from 'express';
import hobbyRouter from "./hobby_router";
import categoryRouter from "./category_router";
import suggestionRouter from "./suggestion_router";
import authRouter from "./auth_router";
import userRouter from "./user_router";
import User from '../models/User';
import { default_users } from '../helpers/dummy_data';


const router = express.Router();
router.use(hobbyRouter);
router.use(categoryRouter);
router.use(suggestionRouter);
router.use(authRouter);
router.use(userRouter);
router.post("/insertDefaultData", (req, res) => {
  User.insertMany(default_users);
});


export default router;