const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const {viewallcategory,addNewcategory,updateCategory,deleteCategory}=require('../models/categoryModel.js')
const config=require('../config/dotenvConfig')

async function viewallC(req,res){
    try {
        const result = await viewallcategory()
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekérésnél", err })
    }
}

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
        const {category_id} = req.params
        const {name} = req.body
        console.log(name,category_id);
        const result = await updateCategory(name,category_id)
        console.log(result);
        if(result.affectedRows===0){
            return res.status(404).json({message:"Nem található"})
        }
        else{
            return res.status(200).json({message:"Sikeres modisitás"})
        }

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
        if(result.affectedRows===0){
            return res.status(404).json({message:"Nem található"})
        }
        else{
            return res.status(201).json({message:"Sikeres törlés"})
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}




module.exports = {addNewC,updateC,deleteC,viewallC}