const express = require('express')
const {auth}=require('../middleware/userMiddleware.js')

const {cheapcars} = require('../controllers/FilterController.js')

const router = express.Router()
//router that handles filtering
router.post('/cheap', cheapcars)

//not done yet
//expent this more
module.exports = router