import express from 'express';
import SuggestionController from "../controllers/suggestion_controller";


const router = express.Router();
router.get("/admin/tampil-saran-hobi", new SuggestionController().index);
router.post("/admin/menerima-saran-hobi", new SuggestionController().acceptSuggestion);
router.post("/admin/menolak-saran-hobi", new SuggestionController().denySuggestion);
router.get("/saran-hobi", new SuggestionController().create);
router.post("/saran-hobi", new SuggestionController().store);


export default router;