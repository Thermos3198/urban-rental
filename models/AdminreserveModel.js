const db = require('../db/db')

async function Adminreservation(user_id) {
    const sql= 'SELECT * FROM reservations'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

async function Adminupdatereservation(vehicle_id,pickup_date,return_date,status,reservation_id){
    const sql = 'UPDATE `reservations` SET `vehicle_id`=?,`pickup_date`=?,`return_date`=?,`status`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [vehicle_id,pickup_date,return_date,status,reservation_id])
    console.log(result);
    return result
}

async function Admindeletereservation(reservation_id) {
    const sql='DELETE FROM `reservations` WHERE `reservation_id`=?'
    const [result]=await db.query(sql,[reservation_id])
    console.log(result);
    return result
}
module.exports = {Adminupdatereservation, Admindeletereservation,Adminreservation}