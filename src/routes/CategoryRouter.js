const express = require('express');
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");


router.get("/category/:categorySlug", CategoryController.show);
router.get("/admin/tambah-kategori", CategoryController.create);
router.post("/admin/tambah-kategori", CategoryController.store);
router.get("/admin/tampil-kategori", CategoryController.index);
router.post("/admin/tampil-kategori", CategoryController.find);
router.post("/admin/menghapus-kategori", CategoryController.destroy);
router.get("/admin/mengubah-kategori/:slug", CategoryController.edit);
router.post("/admin/mengubah-kategori", CategoryController.update);


module.exports = router;