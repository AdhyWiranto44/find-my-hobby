const express = require('express')
const suggestionRouter = express.Router()

const SuggestionController = require("../controllers/suggestion")

////////////////////////////////////

suggestionRouter.get("/admin/tampil-saran-hobi", SuggestionController.getAllSuggestionHobby)
suggestionRouter.post("/admin/menerima-saran-hobi", SuggestionController.postAcceptSuggestionHobby)
suggestionRouter.post("/admin/menolak-saran-hobi", SuggestionController.postDeclineSuggestionHobby)
suggestionRouter.get("/saran-hobi", SuggestionController.getSuggestionHobbyPage)
suggestionRouter.post("/saran-hobi", SuggestionController.postSuggestionHobbyPage)

////////////////////////////////////

module.exports = suggestionRouter