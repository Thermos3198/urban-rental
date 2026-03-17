const express = require('express')
const {register,login, whoAmI, logout, showuserprofile, newuserprofilepic,edituser,deleteuser,viewcars} = require('../controllers/userController.js')
const {auth}=require('../middleware/userMiddleware')
const {useruploadpic}=require('../middleware/userpicuploadMiddleware.js')

const router = express.Router()
//basic
router.post('/register', register)

router.post('/login', login)

router.get('/whoami', auth,  whoAmI)

router.post('/logout', auth, logout)

//profile

router.get('/userprofile', auth, showuserprofile)


router.post('/newuserprofile/:user_id', auth, useruploadpic.single("img"), newuserprofilepic)


router.put('/edituserprofile/:user_id', auth, edituser)

router.delete('/deleteuser/:user_id',auth,deleteuser)

//wievallcars
router.get('/cars',auth,viewcars)


module.exports = router