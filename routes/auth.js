const express = require('express')
const authRouter = express.Router()

const AuthController = require("../controllers/auth")

////////////////////////////////////

authRouter.get("/auth/login", AuthController.getLoginPage)
authRouter.post("/auth/login", AuthController.login)
authRouter.get("/auth/logout", AuthController.logout)

////////////////////////////////////

module.exports = authRouter