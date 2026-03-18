const express = require('express')
const {auth}=require('../middleware/userMiddleware.js')

const {cheapcars, filterCars} = require('../controllers/FilterController.js')

const router = express.Router()

router.post('/cheap', cheapcars)
router.post('/filter', filterCars)

module.exports = router