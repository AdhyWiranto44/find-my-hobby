const express = require('express')
const hobbyRouter = express.Router()

const HobbyController = require("../controllers/hobby")

////////////////////////////////////

hobbyRouter.get("/category/:categorySlug", HobbyController.getHobbyByCategory)
hobbyRouter.get("/hobby/:categorySlug/:hobbySlug", HobbyController.getHobby)
hobbyRouter.get("/search/", HobbyController.getSearchPage)
hobbyRouter.get("/search/:searchTerm", HobbyController.getFoundHobby)
hobbyRouter.get("/carikan-saya-hobi", HobbyController.getRandomHobby)
hobbyRouter.get("/admin/tampil-semua-hobi", HobbyController.getAllHobby)
hobbyRouter.post("/admin/tampil-semua-hobi", HobbyController.postAllHobby)
hobbyRouter.get("/admin/tambah-hobi-baru", HobbyController.getAddHobby)
hobbyRouter.post("/admin/tambah-hobi-baru", HobbyController.postAddHobby)
hobbyRouter.post("/admin/menghapus-hobi", HobbyController.postRemoveHobby)
hobbyRouter.get("/admin/mengubah-hobi/:slug", HobbyController.getUpdateHobby)
hobbyRouter.post("/admin/mengubah-hobi", HobbyController.postUpdateHobby)

////////////////////////////////////

module.exports = hobbyRouter