require('dotenv').config()

const app =require('./routes/index')

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})