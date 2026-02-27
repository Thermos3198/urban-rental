const express = require('express')
const {auth}=require('../middleware/userMiddleware')
const {reservation,newreservation,updatereservation,deletereservation}=require('../models/reserveModel.js')
const router = express.Router()
//router that handles the user reserving a car
router.get('/reservation', auth, reservation)

router.post('/newreservation', auth, newreservation)

router.put('/updatereservation', auth, updatereservation)

router.delete('/deletereservation', auth, deletereservation)

module.exports = router