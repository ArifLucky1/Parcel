import express from "express";

import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";
import { createProduct, fetchAllProducts, updateProduct } from "../controllers/productController.js";


const router = express.Router();


router.post("/admin/create", isAuthenticated, authorizedRoles("Admin"), createProduct);
router.get("/", fetchAllProducts);
router.put("/admin/update/:productId", isAuthenticated, authorizedRoles("Admin"), updateProduct);

export default router;