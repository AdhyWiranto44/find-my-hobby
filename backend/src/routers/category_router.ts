import express from 'express';
import CategoryController from "../controllers/category_controller";


const router = express.Router();
router.get("/admin/tampil-kategori", new CategoryController().index);
router.get("/category/:categorySlug", new CategoryController().show);
router.get("/admin/tambah-kategori", new CategoryController().create);
router.get("/admin/mengubah-kategori/:slug", new CategoryController().edit);
router.post("/admin/tambah-kategori", new CategoryController().store);
router.post("/admin/tampil-kategori", new CategoryController().find);
router.post("/admin/menghapus-kategori", new CategoryController().destroy);
router.post("/admin/mengubah-kategori", new CategoryController().update);


export default router;