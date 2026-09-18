import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
    const {} = req.body;
})