const PostCont=require('../controllers/posts')
const router=require('express').Router()

router.post('/',PostCont.create)
router.get('/',PostCont.all)
router.get('/:id',PostCont.get)
router.put('/:id',PostCont.update)
router.delete('/:id',PostCont.delete)

module.exports=router