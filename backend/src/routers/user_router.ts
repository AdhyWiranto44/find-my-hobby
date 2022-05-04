import express from 'express';
import UserController from "../controllers/user_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
const userController = new UserController();
const authentication = new Authentication();

router.get("/users", authentication.authenticate, userController.getAll);
router.get("/users/:username", authentication.authenticate, userController.getOne);
router.post("/users", authentication.authenticate, userController.create);
router.patch("/users/:username", authentication.authenticate, userController.update);
router.delete("/users/:username", authentication.authenticate, userController.delete);


export default router;