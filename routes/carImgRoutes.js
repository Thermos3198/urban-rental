const express = require('express')
const {allVehicleImg}=require('../models/carImgModel.js')
const router = express.Router()

router.get('/images',allVehicleImg)

module.exports = router