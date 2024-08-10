import app from "./app.js";
import dotenv from "dotenv"
dotenv.config()


let PORT = process.env.PORT



app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
})
