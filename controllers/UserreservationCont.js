const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const {reservation,newreservation,updatereservation,deletereservation}=require('../models/reserveModel.js')
const config=require('../config/dotenvConfig')

async function viewRs(req,res){
    try {
        const {user_id} = req.params
        console.log(user_id);
        const [result] = await reservation(user_id)
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

async function NewRs(req,res){
    try {
        const {user_id,vehicle_id,pickup_date,return_date} = req.params
        console.log(user_id,vehicle_id,pickup_date,return_date);
        
        if (!pickup_date || !return_date) {
            return res.status(400).json({ error: "Pickup és return date kötelező" });
        }

        const [result] = await newreservation(user_id,vehicle_id,pickup_date,return_date)
        console.log(result);
        res.status(201).json({message:"Sikeres feltöltés"})

    } catch (err) {
        console.log(err);
        if (err.message === 'Ez a jármű lefoglalt az adott időszakra') {
            return res.status(409).json({ error: err.message });
        }
        return res.status(500).json({ error: "Hiba a feltöltésen", err })
    }
}

async function URs(req,res){
    try {
        const {vehicle_id,pickup_date,return_date,status} = req.params
        console.log(vehicle_id,pickup_date,return_date,status);
        const [result] = await updatereservation(vehicle_id,pickup_date,return_date,status)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function Drs(req,res){
    try {
        const {reservation_id} = req.params
        console.log(reservation_id);
        const [result] = await deletereservation(reservation_id)
        console.log(result);
        res.status(201).json({message:"Sikeres delete"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}

module.exports = {viewRs,NewRs,Drs,URs}
