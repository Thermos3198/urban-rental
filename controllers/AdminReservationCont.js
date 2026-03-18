const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {Adminreservation,Adminupdatereservation,Admindeletereservation}=require('../models/AdminreserveModel.js')
const config=require('../config/dotenvConfig')

async function viewARs(req,res){
    try {
        const [result] = await Adminreservation()
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

async function UARs(req,res){
    try {
        const {vehicle_id,pickup_date,return_date,status,reservation_id} = req.params
        console.log(vehicle_id,pickup_date,return_date,status,reservation_id);
        
        if (!pickup_date || !return_date) {
            return res.status(400).json({ error: "Pickup és return date kötelező" });
        }

        const [result] = await Adminupdatereservation(vehicle_id,pickup_date,return_date,status,reservation_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function DARs(req,res){
    try {
        const {reservation_id} = req.params
        console.log(reservation_id);
        const [result] = await Admindeletereservation(reservation_id)
        console.log(result);
        res.status(201).json({message:"Sikeres delete"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}



module.exports = {viewARs,DARs,UARs}