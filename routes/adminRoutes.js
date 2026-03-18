const express = require('express')
const {upload}=require('../middleware/uploadMiddleware.js')
const {admin}=require('../middleware/adminMiddleware.js')
//good
const {login, whoAmI, logout, banuser, delVehicleImg, carwithimgupload ,deletewholevehicle,editcar,showcdwi,allusers,editoneuser} = require('../controllers/adminController.js')

const {addNewC, updateC, deleteC,viewallC} = require('../controllers/categoryController.js')

const { auth } = require('../middleware/userMiddleware.js')

const router = express.Router()
//basic 

router.post('/login', login)
router.get('/whoami', auth,admin,  whoAmI)
router.post('/logout', auth,admin, logout)
//carimg 
//cardatawithimgupload
router.post('/carwithimgupload/:vehicle_id',auth,admin, upload.array("img",10), carwithimgupload)
router.delete('/deletecarimg/:vehicle_id',auth,admin,delVehicleImg)

//car
router.get('/adminshowallcars',auth,admin, showcdwi)
router.delete('/deletewholecar/:vehicle_id',auth,admin,deletewholevehicle)
router.put('/editvehicle/:vehicle_id',auth,admin,editcar)

//vehicle category
router.get('/allcategory', auth,admin, viewallC)
router.post('/newcategory', auth,admin, addNewC)
router.put('/updatecategory/:category_id', auth,admin, updateC)
router.delete('/deletecategory/:category_id', auth,admin, deleteC)

//user control
router.get('/alluser',auth,admin, allusers)
router.put('/editoneuser/:user_id',auth,admin, editoneuser)
router.delete('/deleteoneuser/:user_id',auth,admin, banuser)

//admin side revervation
//admin router that handles the admin edittting a reservation a car

const {viewAdminreservations,UAdminreservations,DAdminreservations} = require('../controllers/AdminReservationCont.js')

router.get('/reservation',auth,admin, viewAdminreservations)

router.put('/updatereservation/:reservation_id', auth,admin, UAdminreservations)

router.delete('/deletereservation/:reservation_id', auth,admin, DAdminreservations)



//admin side rentals
const {viewRs,viewARs,NewRs, URs, Drs} = require('../controllers/RentalController.js')


router.get('/allrentals', auth,admin, viewARs)

router.get('/rentals/:user_id', auth,admin, viewRs)

router.post('/newrental', auth,admin, NewRs)

router.put('/updaterental/:user_id', auth,admin, URs)

router.delete('/deleterental', auth,admin, Drs)

//filter
const {filterCars} = require('../controllers/FilterController.js')

router.post('/filter',auth,admin, filterCars)


module.exports = router