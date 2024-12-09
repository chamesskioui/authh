const express=require("express")
const config = require("./configuration/config")
const userrouter = require("./router/user")
const app=express()
const port=4000
app.use (express.json())
app.use("/",userrouter)
config()

app.listen(port,console.log("server is running"))
