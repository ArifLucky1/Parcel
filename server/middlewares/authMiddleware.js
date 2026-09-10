import jwt  from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import database from "../database/db.js";


export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if(!token){
        return next 
    }
})