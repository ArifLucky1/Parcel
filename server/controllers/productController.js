import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {v2 as cloudinary} from "cloudinary";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  const created_by = req.user.id;

  if (!name || !description || !price || !category || !stock) {
    return next(
      new ErrorHandler("Please provide complete product details.", 400)
    );
  }

  let uploadedImage = [];
  if(req.files && req.files.images){
    const images = Array.isArray(req.files.images)
    ? req.files.images : [req.files.images];

    for(const image of images){
        const result = await cloudinary.uploader.upload(image.tempFilepath, {
            folder: "Ecommerce_Product_Images",
            width: 1000,
            crop: "scale"
        });
    }
  }  
});
