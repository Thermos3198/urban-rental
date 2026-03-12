const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {} = require('../models/')
const config=require('../config/dotenvConfig')
//not done yet
async function cheapcars(req,res){
    try {
        const {vehicle_id,description} = req.params
        console.log(vehicle_id,description);
        const result = await addNewMaintenance(vehicle_id,description)
        console.log(result);
        res.status(201).json({message:"Sikeres feltöltés"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a feltöltésen", err })
    }
}



module.exports = {cheapcars}