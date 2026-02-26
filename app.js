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

app.use('/users', userRoutes)
app.use('/admin',adminRoutes)
app.use('/api/vehicle-images',carImgRoutes)
app.use('/api/reservations',reservationsRoutes)

module.exports = app