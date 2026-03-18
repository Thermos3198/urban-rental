const db = require('../db/db')

async function allrentals() {
    const sql = 'SELECT * FROM `rentals`'
    const [result] = await db.query(sql)
    console.log(result)
    return result
}

async function myrental(user_id) {
    const sql = 'SELECT * FROM `rentals` WHERE `user_id`=?'
    const [result] = await db.query(sql, [user_id])
    console.log(result)
    return result
}


async function newrental(reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes) {
    //use this to alway insert active in the databse
    // const sql = 'INSERT INTO `rentals`(`rental_id`, `reservation_id`, `vehicle_id`, `user_id`, `start_time`, `expected_return`, `actual_return`, `status`, `damage_notes`) VALUES (NULL,?,?,?,?,?,?,\'active\',?)'

    const sql = 'INSERT INTO `rentals`(`rental_id`, `reservation_id`, `vehicle_id`, `user_id`, `start_time`, `expected_return`, `actual_return`, `status`, `damage_notes`) VALUES (NULL,?,?,?,?,?,?,?,?)'
    const [result] = await db.query(sql, [reservation_id, vehicle_id, user_id, start_time, expected_return, actual_return, status, damage_notes])
    console.log(result)
    return result
}

async function updaterental(reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes,user_id) {
    const sql = 'UPDATE `rentals` SET `reservation_id`=?,`vehicle_id`=?,`start_time`=?,`expected_return`=?,`actual_return`=?,`status`=?,`damage_notes`=? WHERE user_id=?'
    const [result] = await db.query(sql, [reservation_id, vehicle_id, start_time, expected_return, actual_return, status, damage_notes,user_id])
    console.log(result)
    return result
}

async function deleterental(rental_id) {
    const sql = 'DELETE FROM `rentals` WHERE `rental_id`=?'
    const [result] = await db.query(sql, [rental_id])
    console.log(result)
    return result
}

async function updatereservationstatus(status,reservation_id) {
    const sql = 'UPDATE `reservations` SET `status`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [status, reservation_id])
    console.log(result)
    return result
}


module.exports = {newrental, myrental, allrentals, updaterental, deleterental, updatereservationstatus}
