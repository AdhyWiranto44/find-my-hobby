import express from 'express';
import HobbyController from "../controllers/hobby_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
const hobbyController = new HobbyController();
const authentication = new Authentication();

router.get("/hobbies", hobbyController.getAll);
router.get("/hobbies/:slug", hobbyController.getOne);
router.get("/hobbies/categories/:category", hobbyController.getByCategory);
router.post("/hobbies", authentication.authenticate, hobbyController.create);
router.patch("/hobbies/:slug", authentication.authenticate, hobbyController.update);
router.delete("/hobbies/:slug", authentication.authenticate, hobbyController.delete);


export default router;