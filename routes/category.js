const express = require('express')
const categoryRouter = express.Router()

const CategoryController = require("../controllers/category")

////////////////////////////////////

categoryRouter.get("/admin/tambah-kategori", CategoryController.getAddCategory)
categoryRouter.post("/admin/tambah-kategori", CategoryController.postAddCategory)
categoryRouter.get("/admin/tampil-kategori", CategoryController.getAllCategory)
categoryRouter.post("/admin/tampil-kategori", CategoryController.postAllCategory)
categoryRouter.post("/admin/menghapus-kategori", CategoryController.postRemoveCategory)
categoryRouter.get("/admin/mengubah-kategori/:slug", CategoryController.getUpdateCategory)
categoryRouter.post("/admin/mengubah-kategori", CategoryController.postUpdateCategory)

////////////////////////////////////

module.exports = categoryRouter