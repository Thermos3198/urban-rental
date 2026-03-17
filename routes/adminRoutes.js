const express = require('express')
const { upload } = require('../middleware/uploadMiddleware.js')
const { admin } = require('../middleware/adminMiddleware.js')
//good
const { login, whoAmI, logout, banuser, delVehicleImg, carwithimgupload } = require('../controllers/adminController.js')

const { insernewcar, editcar, deletecar } = require('../controllers/cardataController.js')

const { addNewC, updateC, deleteC } = require('../controllers/categoryController.js')
const { auth } = require('../middleware/userMiddleware.js')

const router = express.Router()
//basic 
router.post('/login', login)
router.get('/whoami', auth, whoAmI)
router.post('/logout', auth, logout)
//carimg 
//router.post('/carimgupload',adminauth, upload.array("img",10), carimgupload)

router.post('/carwithimgupload/:userId', auth,admin, upload.array("img", 10), carwithimgupload);

router.delete('/:vehicle_id', auth, delVehicleImg)

//new car

router.post('/deletecar', auth,admin, deletecar)

router.post('/newvehicle', auth,admin, insernewcar)

router.put('/editvehicle', auth,admin, editcar)


//vehicle category
router.post('/newcategory', auth, admin,addNewC)

router.put('/updatecategory', auth, updateC)

router.delete('/deletecategory', auth, deleteC)

//deleteuser 
router.delete('/:deleteuser', auth, banuser)

module.exports = router