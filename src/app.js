import express, { urlencoded } from "express";
import cookiparser from "cookie-parser";

const app = express();
// app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookiparser())
export {app};