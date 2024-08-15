import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()
import { connectDb } from "./config/db.js";


// function call to connecting with database
connectDb()
let PORT = process.env.PORT



app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
