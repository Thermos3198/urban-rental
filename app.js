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
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes=require('./routes/adminRoutes.js')
const globalroute=require('./routes/notLoggedinRoutes.js')
//logedin
app.use('/users', userRoutes)
app.use('/admin',adminRoutes)

//not loggedd in
app.use('/global',globalroute)

const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// 3. Statikus mappák
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app