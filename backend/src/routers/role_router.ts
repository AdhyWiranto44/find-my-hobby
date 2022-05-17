import express from 'express';
import RoleController from '../controllers/role_controller';
import Authentication from '../middlewares/authentication';


const router = express.Router();
const roleController = new RoleController();
const authentication = new Authentication();

router.get("/roles", authentication.authenticate, roleController.getAll);
router.get("/roles/:slug", authentication.authenticate, roleController.getOne);
router.post("/roles", authentication.authenticate, roleController.create);
router.patch("/roles/:slug", authentication.authenticate, roleController.update);
router.delete("/roles/:slug", authentication.authenticate, roleController.delete);


export default router;