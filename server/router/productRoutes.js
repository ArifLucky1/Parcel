import express from "express";

import { authorizedRoles, isAuthenticated } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, fetchAllProducts, fetchSingleProduct, postProductReview, updateProduct } from "../controllers/productController.js";


const router = express.Router();


router.post("/admin/create", isAuthenticated, authorizedRoles("Admin"), createProduct);
router.get("/", fetchAllProducts);
router.put("/admin/update/:productId", isAuthenticated, authorizedRoles("Admin"), updateProduct);
router.delete("/admin/delete/:productId", isAuthenticated, authorizedRoles("Admin"), deleteProduct);
router.get("/singleProduct/:productId", fetchSingleProduct);
router.put("/post-new/review/:productId", isAuthenticated, postProductReview);

export default router;