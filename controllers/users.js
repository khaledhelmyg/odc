const User=require('../models/users')
const {resHelper}=require('./index')
class UserCont{
    static register =async(req,res)=>{
        try {
            if(req.body.password.length < 6 ) throw new Error("Password should by greater then 6")
            const newUser = new User(req.body)
            await newUser.save()
            resHelper(res,200,true,newUser,"user Created successfully")
            
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static login =async(req,res)=>{
        try {
           const userData=await User.loginUser(req.body.email,req.body.password)
           resHelper(res,200,true,userData,"loged in successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static update =async(req,res)=>{
        try {
            const userData=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            // const updatedIser=await User.findById(req.params.id)
            resHelper(res,200,true,userData,"updated successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static delete =async(req,res)=>{
        try {
            const userData=await User.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,userData,"deleted successfully")
            
        } catch (err) {
            resHelper(res,500,false,err,err.message)
            
        }
    }
    static deleteProfile =async(req,res)=>{
            resHelper(res,200,true,{user:{}},"delete profile successfully")
    }
    static all=async(req,res)=>{
        try {
            const allUsers=await User.find()
            resHelper(res,200,true,allUsers,"get all users successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }

    static single=async(req,res)=>{
        try {
            const user=await User.findById(req.params.id)
            resHelper(res,200,true,user,"get single user")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static profile = (req,res)=>{
        resHelper(res, 200, true,{user: req.user},"user profile fetched")
    }
    static logout=async(req,res)=>{
        try {
            req.user.tokens=req.user.tokens.filter(
                t=> t.token != req.token
            )
            await req.user.save()
            resHelper(res,200,true,null,"logout user")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static logoutAll=async(req,res)=>{
        try {
            req.user.tokens=[]
            await req.user.save()
            resHelper(res,200,true,null,"logout users")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static changeStatus=async(req,res)=>{
        try {
            let user=req.user
            if(!req.query.current || req.query.current=="0") {
                user=User.findById(req.body._id)
            }
            if(req.query.activate=="1")user.status=true
            else user.status=false
            await user.save()
            resHelper(res,200,true,user,"status changed ")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static addAddress=async(req,res)=>{
        try {
            const user=await UserCont.findById(req.params.id)
            user.addresses=user.addresses.push(req.body)
            await user.save()
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
}

module.exports=UserCont