const express = require('express')
const {upload}=require('../middleware/uploadMiddleware.js')
const {adminauth}=require('../middleware/adminMiddleware.js')
//good
const {login, whoAmI, logout, banuser, delVehicleImg, carwithimgupload } = require('../controllers/adminController.js')

const {insernewcar,editcar,deletecar} = require('../controllers/cardataController.js')

const {addNewC, updateC, deleteC} = require('../controllers/categoryController.js')

const router = express.Router()
//basic 
router.post('/login', login)
router.get('/whoami', adminauth,  whoAmI)
router.post('/logout', adminauth, logout)
//carimg 
//router.post('/carimgupload',adminauth, upload.array("img",10), carimgupload)

router.post('/carwithimgupload/:vehicle_id',adminauth, upload.array("img",10), carwithimgupload)
router.delete('/:vehicle_id',adminauth,delVehicleImg)

//new car

router.post('/deletecar',adminauth,deletecar)

router.post('/newvehicle',adminauth,insernewcar)

router.put('/editvehicle',adminauth,editcar)


//vehicle category
router.post('/newcategory', adminauth, addNewC)

router.put('/updatecategory', adminauth, updateC)

router.delete('/deletecategory', adminauth, deleteC)

//deleteuser 
router.delete('/:deleteuser',adminauth, banuser)

module.exports = router