const mongoose=require('mongoose')
const validator=require("validator")
const bcryptjs=require("bcryptjs")
const userSchema=new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        min:3, 
        max:10,
        lowercase:true,
        trim:true,
    },
    lName:{
        type:String,
        required:true,
        min:3, 
        max:10,
        lowercase:true,
        trim:true,
    },
    age:{
        type:Number,
        min:20,
        max:60
    },
    status:{
        type: Boolean,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error("invalid email format!")
        }
    },
    phone:{
        type:String,
        required:true,
        validate(value){
            if(! validator.isMobilePhone(value,"ar-EG")) throw new Error("invalide phone!")
        }
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        trim:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
        lowercase:true,
    },
    dOfBirth:{
        type: Date
    }, 
    image:{
        type:String,
        trim:true,
    },
    addresses:[
        {
            addressType:{
                type:String,
                trim:true,
                required:true
            },
            details:{}
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true,
}
)
userSchema.pre('save',async function(){
    if(this.isModified("password")){
        this.password=await bcryptjs.hash(this.password,8)
    }
})
userSchema.statics.loginUser= async(email,password)=>{
    const valideUser= await User.findOne({email})
    if(! valideUser)throw new Error("invalide email")
    const validPassword=await bcryptjs.compare(password , valideUser.password)
    if (!validPassword )throw new Error("Invalid email or password!")
    return valideUser
}
userSchema.methods.toJSON=function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    delete data.token
    return data
}

const User=mongoose.model("User",userSchema)
module.exports=User