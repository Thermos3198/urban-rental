const express = require('express')
const {viewcars} = require('../controllers/userController.js')

const router = express.Router()

//wievallcars
router.get('/cars',viewcars)
//filter
const {filterCars} = require('../controllers/FilterController.js')

router.post('/filter', filterCars)

module.exports = router