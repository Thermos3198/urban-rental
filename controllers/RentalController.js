const {newrental, rental, adminrental, updaterental, deleterental, updatereservationstatus} = require('../models/rentalModel.js')

async function viewRs(req, res) {
    try {
        const {user_id} = req.params
        console.log(user_id)
        const [result] = await rental(user_id)
        console.log(result)
        res.status(201).json({message: "Sikeres lekérés", result})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a lekéréskor", err})
    }
}

async function viewARs(req, res) {
    try {
        const [result] = await adminrental()
        console.log(result)
        res.status(201).json({message: "Sikeres lekérés", result})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a lekéréskor", err})
    }
}

async function NewRs(req, res) {
    try {
        const {reservation_id, vehicle_id, user_id, start_time, expected_return, damage_notes} = req.body
        console.log(reservation_id, vehicle_id, user_id, start_time, expected_return, damage_notes)
        const [result] = await newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, damage_notes)
        await updatereservationstatus(reservation_id, 'active_rental')
        console.log(result)
        res.status(201).json({message: "Sikeres feltöltés"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Hiba a feltöltésen", err})
    }
}

async function URs(req, res) {
    try {
        const {reservation_id, rental_id, status, actual_return, damage_notes} = req.body
        console.log(reservation_id, rental_id, status, actual_return, damage_notes)
        const [result] = await updaterental(reservation_id, rental_id, status, actual_return, damage_notes)
        if (status === 'completed') {
            await updatereservationstatus(reservation_id, 'completed')
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
