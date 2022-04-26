import express from 'express';
import HobbyController from "../controllers/hobby_controller";


const router = express.Router();
router.get("/hobbies", new HobbyController().getAll);
router.get("/hobbies/:slug", new HobbyController().getOne);
router.post("/hobbies", new HobbyController().create);
router.patch("/hobbies/:slug", new HobbyController().update);
router.delete("/hobbies/:slug", new HobbyController().delete);


export default router;