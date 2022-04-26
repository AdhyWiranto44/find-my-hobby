import express from 'express';
import UserController from "../controllers/user_controller";


const router = express.Router();
router.get("/users", new UserController().getAll);
router.get("/users/:username", new UserController().getOne);
router.post("/users", new UserController().create);
router.patch("/users/:username", new UserController().update);
router.delete("/users/:username", new UserController().delete);


export default router;