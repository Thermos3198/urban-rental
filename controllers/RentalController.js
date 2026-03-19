const {newrental, myrental, allrentals, updaterental, deleterental, updatereservationstatus} = require('../models/rentalModel.js')

async function viewARs(req, res) {
    try {
        const [result] = await allrentals()
        console.log(result)
        res.status(201).json({message: "Sikeres lekérés", result})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a lekéréskor", err})
    }
}

async function viewRs(req, res) {
    try {
        const {user_id} = req.params
        console.log(user_id)
        const [result] = await myrental(user_id)
        console.log(result)
        res.status(201).json({message: "Sikeres lekérés", result})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a lekéréskor", err})
    }
}


async function NewRs(req, res) {
    try {
        const {reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes} = req.body

        console.log(reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes)

        const [result] = await newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes)

        const [result2]=await updatereservationstatus('active_rental',reservation_id)

        console.log(result)
        console.log(result2)
        res.status(201).json({message: "Sikeres feltöltés",result,result2})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a feltöltésen", err})
    }
}

async function URs(req, res) {
    try {
        const {user_id} = req.params

        const {reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes} = req.body
        
        console.log(user_id)
        console.log(reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes)

        const [result] = await updaterental(reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes,user_id)
        if (status === 'completed') {
            await updatereservationstatus('completed',reservation_id,)
        }
        console.log(result)
        res.status(201).json({message: "Sikeres modositás"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a modisitáskor", err})
    }
}

async function Drs(req, res) {
    try {
        const {rental_id} = req.params
        console.log(rental_id)
        const [result] = await deleterental(rental_id)
        console.log(result)
        res.status(201).json({message: "Sikeres delete"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a törléskor", err})
    }
}


module.exports = {viewRs, viewARs, NewRs, URs, Drs}
