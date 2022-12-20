const express = require('express')
const usersRouter = require('./users')
const postsRouter = require('./posts')
require('../models/index')
const app=express()

app.use(express.json())

app.use('/api/users',usersRouter)
app.use('/api/posts',postsRouter)

app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})

module.exports= app
