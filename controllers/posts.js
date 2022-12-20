const { resHelper } = require('.')
const Post=require('../models/posts')
class PostCont{
    static create =async(req,res)=>{
        try {
            const newPost=new Post(req.body)
            await newPost.save()
            resHelper(res,200,true,newPost,"post created successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)   
        }
    }
    static get =async(req,res)=>{
        try {
            const postData=await Post.findById(req.params.id)
            resHelper(res,200,true,postData,"get post successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)   
        }
    }
    static all=async(req,res)=>{
        try {
            const allPosts=await Post.find()
            resHelper(res,200,true,allPosts,"get all posts successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static update =async(req,res)=>{
        try {
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            resHelper(res,200,true,updatedPost,"post updated successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static delete =async(req,res)=>{
        try {
            const deletedPost=await Post.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,deletedPost,"post deleted successfully")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
}

module.exports= PostCont