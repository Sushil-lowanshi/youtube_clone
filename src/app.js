import express, { urlencoded } from "express";
import cookiparser from "cookie-parser";

const app = express();
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookiparser())


// routes import
import userRouter from "./routes/user.router.js"

// route declaration 
app.use("/api/v2/users", userRouter)



export {app};