import express from 'express';
import HomeController from "../controllers/home_controller";


const router = express.Router();
router.get("/", new HomeController().index);
router.get("/search", new HomeController().find);
router.get("/carikan-saya-hobi", new HomeController().findRandomHobby);


export default router;