const express = require('express')
const {register,login, whoAmI, logout, showuserprofile, newuserprofilepic,edituser,deleteuser,viewcars} = require('../controllers/userController.js')
const {auth}=require('../middleware/userMiddleware')
const {useruploadpic}=require('../middleware/userpicuploadMiddleware.js')
const {viewReservations,NewReservations,UReservations,DReservations} = require('../controllers/userController.js')

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


//userreservations
//router that handles the user reserving a car
router.get('/reservation', auth, viewReservations)

router.post('/newreservation', auth, NewReservations)

router.put('/updatereservation', auth, UReservations)

router.delete('/deletereservation', auth, DReservations)


//filter
const {filterCars} = require('../controllers/FilterController.js')

router.post('/filter',auth, filterCars)



module.exports = router