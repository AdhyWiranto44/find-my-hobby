import express from 'express';
import CategoryController from "../controllers/category_controller";


const router = express.Router();
router.get("/categories", new CategoryController().getAll);
router.get("/categories/:slug", new CategoryController().getOne);
router.post("/categories", new CategoryController().create);
router.patch("/categories/:slug", new CategoryController().update);
router.delete("/categories/:slug", new CategoryController().delete);


export default router;