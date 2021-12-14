const express = require('express');
const router = express.Router();
const hobbyController = require("../controllers/hobby_controller");


router.get("/hobby/:categorySlug/:hobbySlug", hobbyController.show);
router.get("/admin/tampil-semua-hobi", hobbyController.index);
router.post("/admin/tampil-semua-hobi", hobbyController.find);
router.get("/admin/tambah-hobi-baru", hobbyController.create)
router.post("/admin/tambah-hobi-baru", hobbyController.store);
router.post("/admin/menghapus-hobi", hobbyController.destroy);
router.get("/admin/mengubah-hobi/:slug", hobbyController.edit);
router.post("/admin/mengubah-hobi", hobbyController.update);


module.exports = router;