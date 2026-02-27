const express = require('express')
const cookieParser=require('cookie-parser')
const cors = require('cors')
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes=require('./routes/adminRoutes.js')
const carImgRoutes=require('./routes/carImgRoutes.js')
const reservationsRoutes=require('./routes/reservationsRoutes.js')
const vehicleData=require('./routes/vehicleDataRoutes.js')
const filtercars=require('./routes/filterCarsRoutes.js')

app.use('/users', userRoutes)
app.use('/admin',adminRoutes)
app.use('/api/vehicle-images',carImgRoutes)
app.use('/api/reservations',reservationsRoutes)
//to get all the data of the cars
app.use('/api/vehicle-data', vehicleData)
//filters the search
app.use('/api/filtercars', filtercars)

module.exports = app