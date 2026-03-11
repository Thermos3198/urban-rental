const express = require('express')
const {upload}=require('../middleware/uploadMiddleware.js')
const {adminauth}=require('../middleware/adminMiddleware.js')
//good
const {login, whoAmI, logout, carimgupload, banuser, delVehicleImg } = require('../controllers/adminController.js')

const {insernewcar,editcar,deletecar} = require('../controllers/cardataController.js')

const {addNewM,editM,mdone} = require('../controllers/maintenanceController.js')

const {addNewcategory,updateCategory,deleteCategory} = require('../controllers/categoryController.js')

const router = express.Router()
//basic 
router.post('/login', login)
router.get('/whoami', adminauth,  whoAmI)
router.post('/logout', adminauth, logout)
//carimg 
router.post('/carimgupload',adminauth, upload.single("img"), carimgupload)
router.delete('/:vehicle_id',adminauth,delVehicleImg)

//new car

router.post('/deletecar',adminauth,deletecar)

router.post('/newvehicle',adminauth,insernewcar)

router.put('/editvehicle',adminauth,editcar)


//maintenence
router.post('/newmaintenance', adminauth, addNewM)

router.put('/editmaintenance', adminauth, editM)

router.put('/maintenancedone', adminauth, mdone )


//vehicle category
router.post('/newcategory', adminauth, addNewcategory)

router.put('/updatecategory', adminauth, updateCategory)

router.delete('/deletecategory', adminauth, deleteCategory)

//deleteuser 
router.delete('/:deleteuser',adminauth, banuser)

module.exports = router