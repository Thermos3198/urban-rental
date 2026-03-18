const express = require('express')
const cookieParser=require('cookie-parser')
const cors = require('cors')
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes=require('./routes/adminRoutes.js')

const UserreservationsRoutes=require('./routes/UserreservationsRoutes.js')
const RentalRoutes=require('./routes/RentalRoutes.js')

const filtercars=require('./routes/filterCarsRoutes.js')

app.use('/users', userRoutes)
app.use('/admin',adminRoutes)

app.use('/api/reservations',UserreservationsRoutes)
app.use('/api/rentals',RentalRoutes)

//filters the search
app.use('/api/filtercars', filtercars)

module.exports = app