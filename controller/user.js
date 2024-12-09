const users=require("../model/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const signup=async(req,res)=>{
    try {
        const found=await users.findOne({email:req.body.email})
        if(found){
            res.status(400).send({msg:"user alredy exist"})
        }
        else {
            const salt=10
            const hpassword=bcrypt.hashSync(req.body.password,salt)
            console.log(hpassword)
            const user=new users(req.body)
            user.password=hpassword
            await user.save()
            const secretkey="abc123"
            const token=jwt.sign({id:user._id,name:user.name},secretkey,{expiresIn:"6d" })
            res.status(200).send({msg:"account added successfully",user,token})
        }
    } catch (error) {
        res.status(500).send({msg:"failed to register",error})
    }
}
const signin=async(req,res)=>{
    try {
        const found=await users.findOne({email:req.body.email})
        if(!found){
            res.status(400).send({msg:"user not found"})
        }
        else{
            const match=bcrypt.compareSync(req.body.password,found.password)
            if(!match){
                res.status(400).send({msg:"password is incorrect"})}
                else{
                    const secretkey="abc123"
                    const token=jwt.sign({id:found._id,name:found.name},secretkey,{expiresIn:"6d"})
                    res.status(200).send({msg:"login successfully",token,user:found})
                }
        }
    } catch (error) {
        res.status(500).send({msg:"login failed",error})
    }
}
module.exports={signup,signin}