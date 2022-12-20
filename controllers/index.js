class Helper{
    static resHelper = (res, statusCode, apiStatus, data, message)=>{
        res.status(statusCode).send({
            apiStatus,
            data, 
            message
        })
    }
}
module.exports=Helper