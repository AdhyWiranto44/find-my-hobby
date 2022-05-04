import express from 'express';
import CategoryController from "../controllers/category_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
const categoryController = new CategoryController();
const authentication = new Authentication();

router.get("/categories", categoryController.getAll);
router.get("/categories/:slug", categoryController.getOne);
router.post("/categories", authentication.authenticate, categoryController.create);
router.patch("/categories/:slug", authentication.authenticate, categoryController.update);
router.delete("/categories/:slug", authentication.authenticate, categoryController.delete);


export default router;