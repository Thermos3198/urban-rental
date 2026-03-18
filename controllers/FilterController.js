const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {CFirstCars, filterVehicles} = require('../models/filterModels.js')
const config=require('../config/dotenvConfig')

async function cheapcars(req,res){
    try {
        const result = await CFirstCars()
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

async function filterCars(req,res){
    try {
        const filters = req.body
        const result = await filterVehicles(filters)
        console.log(result);
        res.status(201).json({message:"Sikeres szűrés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

module.exports = {cheapcars, filterCars}