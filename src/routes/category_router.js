const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category_controller.js");


router.get("/admin/tampil-kategori", categoryController.index);
router.get("/category/:categorySlug", categoryController.show);
router.get("/admin/tambah-kategori", categoryController.create);
router.get("/admin/mengubah-kategori/:slug", categoryController.edit);
router.post("/admin/tambah-kategori", categoryController.store);
router.post("/admin/tampil-kategori", categoryController.find);
router.post("/admin/menghapus-kategori", categoryController.destroy);
router.post("/admin/mengubah-kategori", categoryController.update);


module.exports = router;