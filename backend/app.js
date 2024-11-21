import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.router.js";
import userRouter from "./routes/user.router.js";
import cartRouter from "./routes/cart.router.js";
import wishlistRouter from "./routes/wishlist.router.js";
import productRouter from "./routes/product.router.js";
import adminRouter from "./routes/admin.router.js";

const app = express();

// CORS setup - allow multiple origins (local and production)
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://ebaycom-shaikhmohamms-projects.vercel.app' // Production (Vercel)
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests without an origin (like Postman or cURL)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
}));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies from incoming requests

// Route management

// for categories
app.use('/api', categoryRouter);

// for products
app.use('/api', productRouter);

// for user related requests
app.use('/api', userRouter);

// for cart related requests
app.use(`/api`, cartRouter);

// for wishlist related requests
app.use(`/api`, wishlistRouter);

// for admin related requests
app.use('/api', adminRouter);

export default app;
