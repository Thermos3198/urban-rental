const express = require('express')
const {adminauth}=require('../middleware/adminMiddleware.js')
const {login, whoAmI, logout, carimgupload, banuser } = require('../controllers/adminController.js')
const {upload}=require('../middleware/uploadMiddleware.js')
const {delVehicleImg}=require('../models/carImgModel.js')
const { authPlugins } = require('mysql2')
const router = express.Router()

router.post('/carimgupload',adminauth, upload.single("img"), carimgupload)

router.post('/login', login)

router.get('/whoami', adminauth,  whoAmI)

router.post('/logout', adminauth, logout)

router.delete('/:vehicle_id',adminauth,delVehicleImg)

router.delete('/:deleteuser',adminauth, banuser)

module.exports = router