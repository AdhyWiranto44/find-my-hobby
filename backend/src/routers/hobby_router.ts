import express from 'express';
import HobbyController from "../controllers/hobby_controller";
import Authentication from '../middlewares/authentication';
import multer from 'multer';


const router = express.Router();
const hobbyController = new HobbyController();
const authentication = new Authentication();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_DIRECTORY || `${__dirname}/uploads/`)
  },
  filename: function (req, file, cb) {
    const date = Date.now()
    cb(null, `hobby-${date}.jpg`)
  }
});
const upload = multer({ storage });

router.get("/hobbies", hobbyController.getAll);
router.get("/hobbies/:slug", hobbyController.getOne);
router.get("/hobbies/categories/:category", hobbyController.getByCategory);
router.post("/hobbies", authentication.authenticate, upload.single('img'), hobbyController.create);
router.patch("/hobbies/:slug", authentication.authenticate, hobbyController.update);
router.delete("/hobbies/:slug", authentication.authenticate, hobbyController.delete);


export default router;