const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {insernewvehicle, editvehicle,deletevehicle} = require('../models/cardataModel')
const config=require('../config/dotenvConfig')

async function insernewcar(req,res){
    try {
        const {category_id, Brand, model, color, transmission, license_plate, year,price_per_day} = req.params
        console.log(category_id, Brand, model, color, transmission, license_plate,year,price_per_day);
        const result = await insernewvehicle(category_id, Brand, model, color, transmission, license_plate,year,price_per_day)
        console.log(result);
        res.status(201).json({message:"Sikeres feltöltés"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a feltöltésen", err })
    }
}

async function editcar(req,res){
    try {
        const {category_id, Brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id} = req.params
        console.log(category_id, Brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id);
        const result = await editvehicle(category_id, Brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function deletecar(req,res){
    try {
        const {vehicle_id} = req.params
        console.log(vehicle_id);
        const result = await deletevehicle(vehicle_id)
        console.log(result);
        res.status(201).json({message:"Sikeres törlés"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}




module.exports = {insernewcar,editcar,deletecar}