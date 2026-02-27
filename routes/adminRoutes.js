const express = require('express')
const {adminauth}=require('../middleware/adminMiddleware.js')
const {login, whoAmI, logout, carimgupload, banuser } = require('../controllers/adminController.js')
const {upload}=require('../middleware/uploadMiddleware.js')
const {delVehicleImg}=require('../models/carImgModel.js')
const { authPlugins } = require('mysql2')
const {addNewMaintenance, editMaintenance, maintenancedone}=require('../models/Maintenencemodels.js')
const {addNewcategory,updateCategory,deleteCategory}=require('../models/categoryModel.js')
const router = express.Router()
//admin controlls
router.post('/carimgupload',adminauth, upload.single("img"), carimgupload)

router.post('/login', login)

router.get('/whoami', adminauth,  whoAmI)

router.post('/logout', adminauth, logout)
//admin delete
router.delete('/:vehicle_id',adminauth,delVehicleImg)

router.delete('/:deleteuser',adminauth, banuser)

//maintenence
router.post('/newmaintenance', adminauth, addNewMaintenance)

router.put('/editmaintenance', adminauth, editMaintenance)

router.put('/maintenancedone', adminauth, maintenancedone )

//vehicle category controlls
router.post('/newcategory', adminauth, addNewcategory)

router.put('/updatecategory', adminauth, updateCategory)

router.delete('/deletecategory', adminauth, deleteCategory)



module.exports = router