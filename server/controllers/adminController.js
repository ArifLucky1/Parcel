import ErrorHandler from "../middlewares/errorMiddleware.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import {v2 as cloudinary} from 'cloudinary'



export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;

    const totalUsersResult = await database.query("SELECT COUNT(*) FROM users WHERE role = $1", ["Admin"]
    );

    const totalUsers = parseInt(totalUsersResult.rows[0].count);

    const offset = (page - 1) * 10;

    const users = await database.query("SELECT * FROM users WHERE role = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
        ["Admin", 10, offset]
    );

    res.status(200).json({
        success: true,
        totalUsers,
        currentPage: page,
        users: users.rows
    })
});


export const deleteUser = catchAsyncErrors(async (req, res, next) =>{
    const {id} = req.params;

    const deleteUser = await database.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

    if(deleteUser.rows.length === 0){
        return next(new ErrorHandler("User not found", 404))
    }

    const avatar = deleteUser.rows[0].avatar;
    if(avatar?.public_id){
        await cloudinary.uploader.destroy(avatar.public_id)
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully."
    })
});



export const dashboardStats = catchAsyncErrors(async (req, res, next) =>{
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const yesterday = new Date(today);

    yesterday.setDate(today.getDate() -1);
    const yesterdatDate = yesterday.toISOString().split("T")[0];

    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const previousMonthStart = new Date(today.getFullYear(), today.getMonth() -1, 1);

    const previousMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    const totalRevenueAllTimeQuery = await database.query(`
        SELECT SUM(total_price) FROM orders`);
        const totalRevenueAllTime = parseFloat(totalRevenueAllTimeQuery.rows[0].sum) || 0;

    // Total Users
      const totalUserCountQuery = await database.query(`
        SELECT COUNT(*) FROM users WHERE role = 'User'`);

      const totalUsersCount = parseInt(totalUserCountQuery.rows[0].count) || 0; 

    // Order Status Counts
        const orderStatusCountQuery = await database.query(`
            SELECT order_status, COUNT(*) FROM orders GROUP BY order_status`);
        
        const orderStatusCounts = {
            Processing: 0,
            Shipped: 0,
            Delivered: 0,
            Cancelled: 0
        };
        orderStatusCountQuery.rows.forEach((row)=>{
            orderStatusCounts[row.order_status] = parseInt(row.count);
        });

    
})