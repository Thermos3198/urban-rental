const express = require('express')
const {auth}=require('../middleware/userMiddleware.js')


const {viewRs,NewRs,URs,Drs} = require('../controllers/UserreservationCont.js')

const router = express.Router()
//router that handles the user reserving a car
router.get('/reservation', auth, viewRs)

router.post('/newreservation', auth, NewRs)

router.put('/updatereservation', auth, URs)

router.delete('/deletereservation', auth, Drs)

module.exports = router 