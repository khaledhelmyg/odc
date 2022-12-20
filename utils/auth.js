const {resHelper}=require('../controllers/index')
const jwt=require("jsonwebtoken")
const User = require('../models/users')
const isAuth = async(req,res,next) => {
    try {
        const token=req.header("Authorization").replace("Bearer" , '')
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const authUser=User.findOne({
            _id:decodedToken._id,
            "tokens.token":token
        })
        req.user=authUser
        req.token=token
        next()
    } catch (err) {
        resHelper(res,500,false,err.message,"you are not uthorized")
    }
}
module.exports=isAuth