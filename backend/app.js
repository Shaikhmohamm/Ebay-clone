import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import categoryRouter from "./routes/category.router.js";
import userRouter from "./routes/user.router.js";
import cartRouter from "./routes/cart.router.js";
import wishlistRouter from "./routes/wishlist.router.js";


const app = express()

// Middleware setup
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies from incoming requests



// route management

// for categories
app.use('/api', categoryRouter )

// for user related requests
app.use('/api', userRouter)

// for cart related requests
app.use(`/api`, cartRouter)

// for wishlist related requests
app.use(`/api`, wishlistRouter)



export default app