import express from 'express';
import HobbyController from "../controllers/hobby_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
router.get("/hobbies", new HobbyController().getAll);
router.get("/hobbies/:slug", new HobbyController().getOne);
router.get("/hobbies/categories/:slug", new HobbyController().getByCategory);
router.post("/hobbies", new Authentication().authenticate, new HobbyController().create);
router.patch("/hobbies/:slug", new Authentication().authenticate, new HobbyController().update);
router.delete("/hobbies/:slug", new Authentication().authenticate, new HobbyController().delete);


export default router;