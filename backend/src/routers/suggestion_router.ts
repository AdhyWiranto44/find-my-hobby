import express from 'express';
import SuggestionController from "../controllers/suggestion_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
router.get("/suggestions", new SuggestionController().getAll);
router.get("/suggestions/:slug", new SuggestionController().getOne);
router.get("/suggestions/categories/:slug", new SuggestionController().getByCategory);
router.post("/suggestions", new Authentication().authenticate, new SuggestionController().create);
router.patch("/suggestions/:slug", new Authentication().authenticate, new SuggestionController().update);
router.delete("/suggestions/:slug", new Authentication().authenticate, new SuggestionController().delete);


export default router;