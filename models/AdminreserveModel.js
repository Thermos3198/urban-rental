const db = require('../db/db')

async function Adminreservation(user_id) {
    const sql= 'SELECT * FROM reservations'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

async function Adminupdatereservation(user_id,vehicle_id,pickup_date,return_date,status,created_at,reservation_id){
    const sql = 'UPDATE `reservations` SET `user_id`=?,`vehicle_id`=?,`pickup_date`=?,`return_date`=?,`status`=?,`created_at`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [user_id,vehicle_id,pickup_date,return_date,status,created_at,reservation_id])
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