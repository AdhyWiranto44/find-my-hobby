const express = require('express')
const mainRouter = express.Router()

const MainController = require("../controllers/main")

////////////////////////////////////

mainRouter.get("/", MainController.getHomePage)
mainRouter.post("/", MainController.postSearchPage)
mainRouter.get("/admin/dashboard", MainController.getDashboardPage)

////////////////////////////////////

module.exports = mainRouter