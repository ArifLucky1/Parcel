import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { createTables } from './utils/createTables.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import authRouter from './router/authRoutes.js';
import productRouter from './router/productRoutes.js';
import adminRouter from './router/adminRoutes.js'
import database from './database/db.js';


const app = express();

config({path: "./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
})
);

app.post(
    "/api/v1/payment/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.header["stripe-signature"];
        let event;
        try{
            event = Stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error){
            return res.status(400).send(`Webhook Error: ${error.message || error}`);
        }

        // HAndling the Event

        if(event.type === "payment_intent.succeeded"){
            const paymentIntent_client_secret = event.data.object.client_secret;
            try{
                // FINDING AND UPDATED PAYMENT
                const updatedPaymentStatus = "Paid";
                const paymentTableUpdateResult = await database.query(`
                    UPDATE payments SET payment_status = $1 WHERE payment_intent_id = $2 RETURNING *`, 
                    [updatedPaymentStatus, paymentIntent_client_secret]);
                    const orderTableUpdateResult = await database.query(`UPDATE orders SET paid_id = NOW() WHERE id = $1 RETURNING *`,
                        [paymentTableUpdateResult.rows[0].order_id]
                    );

                // Reduce Stock For Each Product
                const orderId = paymentTableUpdateResult.rows[0].order_id;

                const {rows: orderedItmes} = await database.query(`
                    SELECT product_id, quantity FROM order_items WHERE order_id = $1
                    `, [orderId])
            }catch(error){}
        }
    }
)



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    tempFileDir: "./uploads",
    useTempFiles: true
 })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter)
app.use("/api/v1/admin", adminRouter)


createTables();

app.use(errorMiddleware)

export default app;