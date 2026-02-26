const express = require('express')
const {auth}=require('../middleware/userMiddleware')
const {reservation,updatereservation,deletereservation}=require('../models/reserveModel.js')
const router = express.Router()

router.post('/reservation', auth, reservation)

router.put('/updatereservation', auth, updatereservation)

router.delete('/deletereservation', auth, deletereservation)

module.exports = router