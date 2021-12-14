const express = require('express');
const router = express.Router();
const HobbyController = require("../controllers/HobbyController");


router.get("/hobby/:categorySlug/:hobbySlug", HobbyController.show);
router.get("/admin/tampil-semua-hobi", HobbyController.index);
router.post("/admin/tampil-semua-hobi", HobbyController.find);
router.get("/admin/tambah-hobi-baru", HobbyController.create)
router.post("/admin/tambah-hobi-baru", HobbyController.store);
router.post("/admin/menghapus-hobi", HobbyController.destroy);
router.get("/admin/mengubah-hobi/:slug", HobbyController.edit);
router.post("/admin/mengubah-hobi", HobbyController.update);


module.exports = router;