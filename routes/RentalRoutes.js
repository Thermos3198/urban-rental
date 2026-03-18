const express = require('express')
const {auth} = require('../middleware/userMiddleware.js')
const {adminauth} = require('../middleware/adminMiddleware.js')

const {viewRs, viewARs, NewRs, URs, Drs} = require('../controllers/RentalController.js')

const router = express.Router()

router.get('/rental', auth, viewRs)

router.post('/newrental', adminauth, NewRs)

router.put('/updaterental', adminauth, URs)

router.delete('/deleterental', adminauth, Drs)

router.get('/admin/rental', adminauth, viewARs)

module.exports = router
