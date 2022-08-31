import express from 'express';
import Authentication from '../middlewares/authentication';
import multer from 'multer';
import path from 'path';


const router = express.Router();
const authentication = new Authentication();
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
      cb(null, file.filename);
  }
});
const upload = multer({dest: './public/uploads/images'});

router.post("/uploadFile", upload.single("file"), async (req: any, res: any) => {
  console.log(req.file);
  
});
router.get("/getFile/:path", (req, res) => {
  res.download(`./public/uploads/images/${req.params.path}`);
});
// router.get("/categories/:slug", categoryController.getOne);
// router.patch("/categories/:slug", authentication.authenticate, categoryController.update);
// router.delete("/categories/:slug", authentication.authenticate, categoryController.delete);


export default router;