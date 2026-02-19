const express = require('express')
const {adminauth}=require('../middleware/adminMiddleware.js')
const {login, whoAmI, logout, carimgupload } = require('../controllers/adminController.js')
const { authPlugins } = require('mysql2')
const router = express.Router()

router.post('/carimgupload',carimgupload)

router.post('/login', login)

router.get('/whoami', adminauth,  whoAmI)

router.post('/logout', adminauth, logout)


module.exports = router