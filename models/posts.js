const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    postType:{
        type:String,
        required:true,
        enum:["txt","file"],
        trim:true,
        lowercase:true,
    },
    content:{
        type:String,
        required:function(){
            this.postType=="txt"
        }
    },
    file:{
        type:String,
        required:function(){
            this.postType=="file"
        }
    }
})

const Post=mongoose.model("Post",postSchema)
module.exports=Post