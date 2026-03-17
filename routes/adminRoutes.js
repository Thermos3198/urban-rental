const express = require('express')
const {upload}=require('../middleware/uploadMiddleware.js')
const {adminauth}=require('../middleware/adminMiddleware.js')
//good
const {login, whoAmI, logout, banuser, delVehicleImg, carwithimgupload ,deletewholevehicle,editcar,showcdwi,allusers,editoneuser} = require('../controllers/adminController.js')

const {addNewC, updateC, deleteC} = require('../controllers/categoryController.js')

const router = express.Router()
//basic 

router.post('/login', login)
router.get('/whoami', adminauth,  whoAmI)
router.post('/logout', adminauth, logout)
//carimg 
//cardatawithimgupload
router.post('/carwithimgupload/:vehicle_id',adminauth, upload.array("img",10), carwithimgupload)
router.delete('/deletecarimg/:vehicle_id',adminauth,delVehicleImg)

//car
router.get('/adminshowallcars',adminauth, showcdwi)
router.delete('/deletewholecar/:vehicle_id',adminauth,deletewholevehicle)
router.put('/editvehicle/:vehicle_id',adminauth,editcar)

//vehicle category
router.post('/newcategory', adminauth, addNewC)
router.put('/updatecategory/:category_id', adminauth, updateC)
router.delete('/deletecategory/:category_id', adminauth, deleteC)

//user control
router.get('/alluser',adminauth, allusers)
router.put('/editoneuser/:user_id',adminauth, editoneuser)
router.delete('/deleteoneuser/:user_id',adminauth, banuser)



module.exports = router