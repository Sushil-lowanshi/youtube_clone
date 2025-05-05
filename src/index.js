// const express = require('express')
// import express from "express";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';
import { app } from "./app.js";
dotenv.config({
    path:'./env'
})

/*  */
connectDB()
.then(()=>{
    app.listen(5000,()=>{
    console.log("server is running in port",`${process.env.PORT}`)
})
})
.catch((err)=>{
    console.log("connection error : !!! ", err)
})
// const app = express()
// const data = [{
//     name:'hello'
// }]
// app.get('/',(req,res)=>{
//     res.send(data)
// })

// const PORT = process.env.PORT || 5000
 
// app.listen(5000,()=>{
//     console.log("server is running in port",`${PORT}`)
// })