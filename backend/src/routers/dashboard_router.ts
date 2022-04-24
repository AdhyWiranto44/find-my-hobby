import express from 'express';
import DashboardController from "../controllers/dashboard_controller";


const router = express.Router();
router.get("/admin/dashboard", new DashboardController().index);


export default router;