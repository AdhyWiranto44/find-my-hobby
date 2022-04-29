import express from 'express';
import hobbyRouter from "./hobby_router";
import categoryRouter from "./category_router";
import suggestionRouter from "./suggestion_router";
import authRouter from "./auth_router";
import userRouter from "./user_router";
import User from '../models/User';
import { default_categories, default_hobbies, default_suggestions, default_users } from '../helpers/dummy_data';
import { Category } from '../models/Category';
import Hobby from '../models/Hobby';
import Suggestion from '../models/Suggestion';
import Connection from '../database/Connection';
import ApiService from '../services/api_service';
import { LOCAL_ENV } from '../helpers/constants';


const router = express.Router();
router.use(hobbyRouter);
router.use(categoryRouter);
router.use(suggestionRouter);
router.use(authRouter);
router.use(userRouter);
router.post("/insertDefaultData", async (req, res) => {
  try {
    if (process.env.ENVIRONMENT != LOCAL_ENV) {
      throw new Error("Insert default data not allowed except in local environment.");
    }

    // drop database
    console.log("Dropping database...");
    const conn: Connection = new Connection();
    await conn.createConnection().dropDatabase();
    console.log("Database dropped.");

    // insert default data
    console.log("Inserting default data...");
    await User.insertMany(default_users);
    await Category.insertMany(default_categories);
    await Hobby.insertMany(default_hobbies);
    await Suggestion.insertMany(default_suggestions);
    console.log("Default data inserted.");

    return new ApiService(
      res, 200, true, 
      "Default Data created successfully"
    ).sendResponse();
  } catch (err: any) {
    return new ApiService(res).sendErrorResponse(err);
  }
});


export default router;