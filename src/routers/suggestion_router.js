const express = require('express');
const router = express.Router();
const suggestionController = require("../controllers/suggestion_controller.js");


router.get("/admin/tampil-saran-hobi", suggestionController.index);
router.post("/admin/menerima-saran-hobi", suggestionController.acceptSuggestion);
router.post("/admin/menolak-saran-hobi", suggestionController.denySuggestion);
router.get("/saran-hobi", suggestionController.create);
router.post("/saran-hobi", suggestionController.store);


module.exports = router;