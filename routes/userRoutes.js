const express = require('express')
const {register,login, whoAmI, logout, showuserprofile, newuserprofilepic,edituser,deleteuser} = require('../controllers/userController.js')
const {auth}=require('../middleware/userMiddleware')
const {useruploadpic}=require('../middleware/userpicuploadMiddleware.js')

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.get('/whoami', auth,  whoAmI)

router.post('/logout', auth, logout)

//profile

router.get('/userprofile', auth, showuserprofile)


router.get('/newuserprofile', auth, useruploadpic.single("img"), newuserprofilepic)


router.put('/edituserprofile', auth, edituser)

router.delete('/deleteuser',auth,deleteuser)


module.exports = router