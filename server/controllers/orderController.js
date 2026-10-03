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

  const productsIds = items.map(item => item.product.id)
  const {rows: products} = await database.query(`SELECT id, price, stock, name, FROM products WHERE id = ANY($1::uuid[])`, 
    [productsIds]
  );

  let total_price = 0;
  const values = [];
  const placeholders = [];

  items.forEach((item, index) => {
    const product = products.find(p => p.id === item.product.id);

    if(!product){
        return next(new ErrorHandler(`Product not found for ID: ${item.product.id}`, 404))
    }

    if(item.quantity > product.stock){
        return next(new ErrorHandler(`Only ${product.stock} units available for ${product.name}`, 400))
    }

    
  })
});
