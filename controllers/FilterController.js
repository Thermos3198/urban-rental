const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {CFirstCars} = require('../models/filterModels.js')
const config=require('../config/dotenvConfig')
//not done yet
async function cheapcars(req,res){
    try {
        const [result] = await CFirstCars()
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

//expend this more

module.exports = {cheapcars}