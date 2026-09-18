import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const created_by = req.user.id;

  if (!name || !description || !price || !category || !stock) {
    return next(
      new ErrorHandler("Please provide complete product details.", 400)
    );
  }
  
});
