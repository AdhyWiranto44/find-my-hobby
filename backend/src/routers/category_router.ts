import express from 'express';
import CategoryController from "../controllers/category_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
router.get("/categories", new CategoryController().getAll);
router.get("/categories/:slug", new CategoryController().getOne);
router.post("/categories", new Authentication().authenticate, new CategoryController().create);
router.patch("/categories/:slug", new Authentication().authenticate, new CategoryController().update);
router.delete("/categories/:slug", new Authentication().authenticate, new CategoryController().delete);


export default router;