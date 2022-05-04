import express from 'express';
import AuthController from "../controllers/auth_controller";


const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login);


export default router;