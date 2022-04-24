import express from 'express';
import HobbyController from "../controllers/hobby_controller";


const router = express.Router();
router.get("/admin/tampil-semua-hobi", new HobbyController().index);
router.get("/hobby/:categorySlug/:hobbySlug", new HobbyController().show);
router.get("/admin/tambah-hobi-baru", new HobbyController().create)
router.get("/admin/mengubah-hobi/:slug", new HobbyController().edit);
router.post("/admin/tampil-semua-hobi", new HobbyController().find);
router.post("/admin/tambah-hobi-baru", new HobbyController().store);
router.post("/admin/menghapus-hobi", new HobbyController().destroy);
router.post("/admin/mengubah-hobi", new HobbyController().update);


export default router;