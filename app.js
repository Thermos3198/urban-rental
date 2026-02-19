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

app.use('/users', userRoutes)
app.use('/admin',adminRoutes)


module.exports = app