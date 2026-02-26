const db = require('../db/db')

async function reservation(user_id,vehicle_id,pickup_date,return_date) {
    const sql= 'INSERT INTO `reservations`(`reservation_id`, `user_id`, `vehicle_id`, `pickup_date`, `return_date`, `status`, `reservation_date`) VALUES (NULL,?,?,?,?,"lefoglalva",CURRENT_TIMESTAMP)'
    const [result] = await db.query(sql, [user_id,vehicle_id,pickup_date,return_date]);
    console.log(result);
    return result
}

async function updatereservation(vehicle_id,pickup_date,return_date,status){
    const sql = 'UPDATE `reservations` SET `vehicle_id`=?,`pickup_date`=?,`return_date`=?,`status`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [vehicle_id,pickup_date,return_date,status])
    console.log(result);
    return result
}

async function deletereservation(reservation_id) {
    const sql='DELETE FROM `reservations` WHERE `reservation_id`=?'
    const [result]=await db.query(sql,[reservation_id])
    console.log(result);
    return result
}
module.exports = {reservation, updatereservation, deletereservation}