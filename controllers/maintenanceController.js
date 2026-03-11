const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {addNewMaintenance,editMaintenance,maintenancedone} = require('../models/Maintenencemodels')
const config=require('../config/dotenvConfig')

async function addNewM(req,res){
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

async function editM(req,res){
    try {
        const {vehicle_id,description,maintenance_date,status ,maintenance_id} = req.params
        console.log(vehicle_id,description,maintenance_date,status ,maintenance_id);
        const result = await editMaintenance(vehicle_id,description,maintenance_date,status ,maintenance_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function mdone(req,res){
    try {
        const {maintenance_id} = req.params
        console.log(maintenance_id);
        const result = await maintenancedone(maintenance_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}




module.exports = {addNewM,editM,mdone}