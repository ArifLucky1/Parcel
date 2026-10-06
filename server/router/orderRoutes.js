import express from 'express';
import { deleteOrder, fetchAllOrders, fetchMyOrders, fetchSingleOrder, placeNewOrder, updateOrdersStatus } from '../controllers/orderController.js';
import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/new", isAuthenticated, placeNewOrder);
router.get("/:orderId", isAuthenticated, fetchSingleOrder);
router.get("/orders/me", isAuthenticated, fetchMyOrders);
router.get("/admin/getall", isAuthenticated, authorizedRoles("Admin"), fetchAllOrders);
router.put("/admin/update/:orderId", isAuthenticated, authorizedRoles("Admin"), updateOrdersStatus);
router.delete("/admin/delete/:orderId", isAuthenticated, authorizedRoles("Admin"), deleteOrder);



export default router;