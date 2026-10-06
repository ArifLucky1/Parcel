import express from 'express';
import { fetchAllOrders, fetchMyOrders, fetchSingleOrder, placeNewOrder } from '../controllers/orderController.js';
import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/new", isAuthenticated, placeNewOrder);
router.get("/:orderId", isAuthenticated, fetchSingleOrder);
router.get("/orders/me", isAuthenticated, fetchMyOrders);
router.get("/admin/getall", isAuthenticated, authorizedRoles("Admin"), fetchAllOrders);



export default router;