const mongoose=require("mongoose")
const config=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/auth")
        console.log("database is connected")

    } catch (error) {
        console.log("database is not found",error)
    }
}
module.exports=config