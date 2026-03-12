const express = require('express')
const {adminauth}=require('../middleware/adminMiddleware.js')

const {viewARs,UARs,DARs} = require('../controllers/AdminReservationCont.js')

const router = express.Router()
//admin router that handles the user reserving a car
router.get('/reservation', adminauth, viewARs)

router.put('/updatereservation', adminauth, UARs)

router.delete('/deletereservation', adminauth, DARs)

module.exports = router 