const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {addNewcategory,updateCategory,deleteCategory}=require('../models/categoryModel.js')
const config=require('../config/dotenvConfig')

async function addNewC(req,res){
    try {
        const {name} = req.body
        console.log(name);
        const result = await addNewcategory(name)
        console.log(result);
        res.status(201).json({message:"Sikeres feltöltés"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a feltöltésen", err })
    }
}

async function updateC(req,res){
    try {
        const {name,category_id} = req.params
        console.log(name,category_id);
        const result = await updateCategory(name,category_id)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function deleteC(req,res){
    try {
        const {category_id} = req.params
        console.log(category_id);
        const result = await deleteCategory(category_id)
        console.log(result);
        res.status(201).json({message:"Sikeres delete"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}




module.exports = {addNewC,updateC,deleteC}