const {filterVehicles} = require('../models/filterModels.js')

async function filterCars(req,res){
    try {
        const filters = req.body
        const [result] = await filterVehicles(filters)
        console.log(result);
        res.status(201).json({message:"Sikeres szűrés",result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

module.exports = {filterCars}