import express from 'express';
import SuggestionController from "../controllers/suggestion_controller";
import Authentication from '../middlewares/authentication';


const router = express.Router();
const suggestionController = new SuggestionController();
const authentication = new Authentication();

router.get("/suggestions", suggestionController.getAll);
router.get("/suggestions/:slug", suggestionController.getOne);
router.get("/suggestions/categories/:slug", suggestionController.getByCategory);
router.post("/suggestions", authentication.authenticate, suggestionController.create);
router.patch("/suggestions/:slug", authentication.authenticate, suggestionController.update);
router.delete("/suggestions/:slug", authentication.authenticate, suggestionController.delete);


export default router;