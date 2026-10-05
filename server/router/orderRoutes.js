import express from 'express';
import { fetchSingleOrder, placeNewOrder } from '../controllers/orderController.js';
import { isAuthenticated } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/new", isAuthenticated, placeNewOrder);
router.get("/:orderId", isAuthenticated, fetchSingleOrder);



export default router;