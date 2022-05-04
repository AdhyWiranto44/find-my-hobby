import express from 'express';
import UserController from "../controllers/user_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
router.get("/users", new Authentication().authenticate, new UserController().getAll);
router.get("/users/:username", new Authentication().authenticate, new UserController().getOne);
router.post("/users", new Authentication().authenticate, new UserController().create);
router.patch("/users/:username", new Authentication().authenticate, new UserController().update);
router.delete("/users/:username", new Authentication().authenticate, new UserController().delete);


export default router;