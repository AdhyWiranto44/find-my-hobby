import express from 'express';
import AuthController from "../controllers/auth_controller";


const router = express.Router();
router.post("/login", new AuthController().login);


export default router;