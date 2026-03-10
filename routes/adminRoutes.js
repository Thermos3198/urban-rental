const express = require('express')
const {upload}=require('../middleware/uploadMiddleware.js')
const {adminauth}=require('../middleware/adminMiddleware.js')
//good
const {login, whoAmI, logout, carimgupload, banuser, delVehicleImg } = require('../controllers/adminController.js')

const {addNewMaintenance, editMaintenance, maintenancedone}=require('../models/Maintenencemodels.js')

const {addNewcategory,updateCategory,deleteCategory}=require('../models/categoryModel.js')

const {insernewcar}=require('../models/cardataModel.js')


const router = express.Router()
//basic good
router.post('/login', login)
router.get('/whoami', adminauth,  whoAmI)
router.post('/logout', adminauth, logout)
//carimg goood
router.post('/carimgupload',adminauth, upload.single("img"), carimgupload)
router.delete('/:vehicle_id',adminauth,delVehicleImg)

//new car not good
router.post('newvehicle',adminauth,insernewcar)
//todo add cardatacontroller and add that to it+ delete+update

//maintenence not good
router.post('/newmaintenance', adminauth, addNewMaintenance)

router.put('/editmaintenance', adminauth, editMaintenance)

router.put('/maintenancedone', adminauth, maintenancedone )

//vehicle category not good
router.post('/newcategory', adminauth, addNewcategory)

router.put('/updatecategory', adminauth, updateCategory)

router.delete('/deletecategory', adminauth, deleteCategory)

//deleteuser noot good
router.delete('/:deleteuser',adminauth, banuser)

module.exports = router