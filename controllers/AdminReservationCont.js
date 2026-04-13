const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {Adminreservation,Adminupdatereservation,Admindeletereservation}=require('../models/AdminreserveModel.js')
const config=require('../config/dotenvConfig')

async function viewAdminreservations(req,res){
    try {
        const result = await Adminreservation()
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

async function UAdminreservations(req,res){
    try {
        const {user_id,vehicle_id,pickup_date,return_date,status,created_at } = req.body
        const {reservation_id} = req.params
        console.log(user_id,vehicle_id,pickup_date,return_date,status,created_at );
        console.log(reservation_id);
        
        if (!pickup_date || !return_date) {
            return res.status(400).json({ error: "Pickup és return date kötelező" });
        }

        const result = await Adminupdatereservation(user_id,vehicle_id,pickup_date,return_date,status,created_at,reservation_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function DAdminreservations(req,res){
    try {
        const {reservation_id} = req.params
        console.log(reservation_id);
        const result = await Admindeletereservation(reservation_id)
        console.log(result);
        res.status(201).json({message:"Sikeres delete"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}



module.exports = {viewAdminreservations,UAdminreservations,DAdminreservations}