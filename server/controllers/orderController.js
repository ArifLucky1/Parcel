import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import { generatePaymentIntent } from "../utils/generatePaymentIntent.js";

export const placeNewOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    full_name,
    state,
    city,
    country,
    address,
    pincode,
    phone,
    orderedItems,
  } = req.body;
  if (!full_name || !state || !city || !country || !address || !pincode || !phone) {
    return next(new ErrorHandler("Please provide complete shipping details.", 400));
  }

  const items = Array.isArray(orderedItems) ? orderedItems : JSON.stringify(orderedItems);

  if(!items || items.length === 0){
    return next(new ErrorHandler("No items in cart.", 400))
  }

  
});
