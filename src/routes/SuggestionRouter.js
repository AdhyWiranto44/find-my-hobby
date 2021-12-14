const express = require('express');
const router = express.Router();
const SuggestionController = require("../controllers/SuggestionController");


router.get("/admin/tampil-saran-hobi", SuggestionController.index);
router.post("/admin/menerima-saran-hobi", SuggestionController.acceptSuggestion);
router.post("/admin/menolak-saran-hobi", SuggestionController.denySuggestion);
router.get("/saran-hobi", SuggestionController.create);
router.post("/saran-hobi", SuggestionController.store);


module.exports = router;