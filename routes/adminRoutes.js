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



module.exports = router