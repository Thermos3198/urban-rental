const express = require('express')
const {auth} = require('../middleware/userMiddleware.js')
const { admin } = require('../middleware/adminMiddleware.js')

const {viewRs, viewARs, NewRs, URs, Drs} = require('../controllers/RentalController.js')

const router = express.Router()

router.get('/rental', auth, viewRs)

router.post('/newrental', auth, NewRs)

router.put('/updaterental', auth, URs)

router.delete('/deleterental', auth, Drs)

router.get('/admin/rental', auth,admin, viewARs)

module.exports = router
