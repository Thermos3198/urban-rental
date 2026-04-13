const {filterVehicles} = require('../models/filterModels.js')

async function filterCars(req,res){
    try {
        const filters = req.body
        const result = await filterVehicles(filters)
        console.log(result);
        let vehiclesArray = Array.isArray(result) ? result : [result]
        
        console.log("Vehicles from model:", vehiclesArray);
        res.status(201).json({message:"Sikeres szűrés", result: vehiclesArray})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

module.exports = {filterCars}
