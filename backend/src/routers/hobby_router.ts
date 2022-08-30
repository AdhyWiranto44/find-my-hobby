import express from 'express';
import HobbyController from "../controllers/hobby_controller";
import Authentication from '../middlewares/authentication';
import multer from "multer";
import path from 'path';


const router = express.Router();
const hobbyController = new HobbyController();
const authentication = new Authentication();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-').toLowerCase()}`)
  }
})
const upload = multer({ storage });

router.get("/hobbies", hobbyController.getAll);
router.get("/hobbies/:slug", hobbyController.getOne);
router.get("/hobbies/categories/:category", hobbyController.getByCategory);
router.post("/hobbies", authentication.authenticate, upload.single("file"), hobbyController.create);
router.patch("/hobbies/:slug", authentication.authenticate, hobbyController.update);
router.delete("/hobbies/:slug", authentication.authenticate, hobbyController.delete);


export default router;