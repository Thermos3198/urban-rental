const express = require('express')
const cookieParser=require('cookie-parser')
const cors = require('cors')
const app = express();
const path = require('path');

app.use(cors({
    origin: ['http://localhost:5173','https://urbanrentalbaross.netlify.app'],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes=require('./routes/adminRoutes.js')
const globalroute=require('./routes/notLoggedinRoutes.js')
const paymentRoutes=require('./routes/paymentRoutes.js')
//logedin
app.use('/users', userRoutes)
app.use('/admin',adminRoutes)

//not loggedd in
app.use('/global',globalroute)

//payment routes
app.use('/api/payments',paymentRoutes)


app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// 3. Statikus mappák
app.use('/public', express.static(path.join(__dirname, 'public')));

module.exports = app