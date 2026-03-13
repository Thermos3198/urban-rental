const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {findByEmail,isValidEmail, Banusermod} = require('../models/adminModel.js')
const {insertVehicleImg,allVehicleImg,delCarImg}=require('../models/carImgModel.js')
const {insernewvehicle}=require('../models/cardataModel.js')
const config=require('../config/dotenvConfig')

const cookieOpts={
    httpOnly:true,
    secure:false,
    sameSite:'lax',
    path:'/',
    maxAge:1000*60*60*24*7
}

async function login(req,res){
    try {
        const {email,psw}=req.body

        if(!email||!psw){
            return res.status(400).json({error:"email és jelszo kötelezö"})
        }
        const exists = await findByEmail(email)

        if(!isValidEmail(email)){
            return res.status(400).json({error:"Érvénytelen email formátum"})
        }

        if(psw.length<8){
            return res.status(400).json({error:"A jelszó rövidebb mint 8 character"})
        }
        
        if(!exists) {
            return res.status(401).json({error: 'hibás email'})
        }
        const ok=await bcrypt.compare(psw,exists.psw)

        if(!ok){
            return res.status(401).json({error:'Hibás jelszó'})
        }
        const token=jwt.sign(
            {user_id:exists.user_id,username:exists.username,email:exists.email,role:exists.role,created_at:exists.created_at},
            config.JWT_SECRET,
            {expiresIn:config.JWT_EXPIRES_IN}
        )

        res.cookie(config.ADMINCOOKIE_NAME,token, cookieOpts)
        return res.status(200).json({message:'Sikeres login'})

        //console.log(ok);

    } catch (err) {
        return res.status(500).json({error:'belepesi hiba',err})
    }
}

async function whoAmI(req,res){
    try {
        const {user_id,username,email,role}=req.user
        //console.log(user_id,username,email,role);
        return res.status(200).json({user_id:user_id,username:username,email:email,role:role,created_at:exists.created_at})
    } catch (err) {
        return res.status(500).json({error:'whoami server hiba'})
    }
}

async function logout(req,res){
    try {
        return res.clearCookie(config.ADMINCOOKIE_NAME,{path:'/'}).status(200).json({message:'Sikeres kijelentkezes'})

    } catch (err) {
        return res.status(500).json({error:'logout server hiba'})
    }
}

async function carwithimgupload(req, res) {
    try {
        const { category_id, brand, model, color, transmission, license_plate,year } = req.body;

        const vehicle = await insernewvehicle(
            category_id,
            brand,
            model,
            color,
            transmission,
            license_plate,
            year);

        const vehicle_id = vehicle.insertId;

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const img = `uploads/${vehicle_id}/${file.filename}`;
                await insertVehicleImg(vehicle_id, img);
            }
        }

        res.status(201).json({
            message: "Sikeres feltöltés",
            vehicle_id: vehicle_id,
            uploaded: req.files ? req.files.length : 0
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Hiba a feltöltésen" });
    }
}

async function delVehicleImg(req,res) {
    try {
        const {img} = req.body
        const {vehicle_id} = req.params 
        const result = await delCarImg(vehicle_id,img)
        console.log(result);
        res.status(200).json({message:"Sikeres törlés"})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Nem sikerült törölni",err})
    }
}


async function getcarImg(req,res) {
    try {
        const result = await allVehicleImg()
        console.log(result);
        res.status(200).json({result})
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Nem sikerült lekérdezni az autokat",err})
    }
}



async function banuser(req,res){
    try {
        const {user_id}=req.params
        const result=await Banusermod(user_id)
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Nem sikerült törölni",err})
    }
}




module.exports = {login, whoAmI,logout,getcarImg,delVehicleImg, banuser,carwithimgupload}