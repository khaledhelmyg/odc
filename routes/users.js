const UserCont = require('../controllers/users')
const {isAuth,isAdmin}=require('../utils/auth')
const router=require('express').Router()

router.post('/register',UserCont.register)
router.post('/login',UserCont.login)

router.get('/',isAdmin,isAuth,UserCont.all)
//logout
router.post("/logout", isAuth, UserCont.logout)
//logout all devices
router.post("/logoutAll",isAdmin,isAuth, UserCont.logoutAll)

router.post("/me", isAuth, UserCont.profile)
//delete me
router.delete('/me/:id',isAuth,UserCont.deleteProfile)
//show single user
router.get("/single/:id", isAuth, UserCont.single)
//activate & deactivate status
router.post("/activate",isAuth, UserCont.changeStatus)
//edit my profile
router.put('/:id',isAuth,UserCont.update)
//delete user
router.delete('/:id',isAdmin,isAuth,UserCont.delete)
//add address
router.post('/address',UserCont.addAddress)




//delete address
//show all addresses
//show single address
module.exports=router