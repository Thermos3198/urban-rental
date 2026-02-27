const express = require('express')
const {auth}=require('../middleware/userMiddleware')
const {getcardata}=require('../models/cardataModel.js')
const router = express.Router()

//toget the car date for the main page
router.get('/vehicledata', auth, getcardata)

module.exports = router