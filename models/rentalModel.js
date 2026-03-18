const db = require('../db/db')

async function rental(user_id) {
    const sql = 'SELECT * FROM `rentals` WHERE `user_id`=?'
    const [result] = await db.query(sql, [user_id])
    console.log(result)
    return result
}

async function adminrental() {
    const sql = 'SELECT * FROM `rentals`'
    const [result] = await db.query(sql)
    console.log(result)
    return result
}

async function newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, damage_notes) {
    const sql = 'INSERT INTO `rentals` (`rental_id`, `reservation_id`, `vehicle_id`, `user_id`, `start_time`, `expected_return`, `actual_return`, `status`, `damage_notes`) VALUES (NULL,?,?,?,?,?,?,\'active\',?)'
    const [result] = await db.query(sql, [reservation_id, vehicle_id, user_id, start_time, expected_return, damage_notes])
    console.log(result)
    return result
}

async function updaterental(reservation_id, rental_id, status, actual_return, damage_notes) {
    const sql = 'UPDATE `rentals` SET `status`=?,`actual_return`=?,`damage_notes`=? WHERE `rental_id`=?'
    const [result] = await db.query(sql, [status, actual_return, damage_notes, rental_id])
    console.log(result)
    return result
}

async function updatereservationstatus(reservation_id, status) {
    const sql = 'UPDATE `reservations` SET `status`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [status, reservation_id])
    console.log(result)
    return result
}

async function deleterental(rental_id) {
    const sql = 'DELETE FROM `rentals` WHERE `rental_id`=?'
    const [result] = await db.query(sql, [rental_id])
    console.log(result)
    return result
}

module.exports = {newrental, rental, adminrental, updaterental, deleterental, updatereservationstatus}
