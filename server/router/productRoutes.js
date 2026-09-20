import express from "express";

import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";
import { createProduct } from "../controllers/productController.js";


const router = express.Router();


router.post("/admin/create", isAuthenticated, authorizedRoles("Admin"), createProduct)

export default router;