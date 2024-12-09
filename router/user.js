const express=require("express")
const { signup, signin } = require("../controller/user")
const userrouter=express.Router()
userrouter.post("/register",signup)
userrouter.post("/login",signin)
module.exports=userrouter
