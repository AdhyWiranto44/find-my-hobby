import express from 'express';
import AuthController from "../controllers/auth_controller";


const router = express.Router();
router.get("/auth/login", new AuthController().index);
router.post("/auth/login", new AuthController().login);
router.post("/auth/logout", new AuthController().logout);


export default router;