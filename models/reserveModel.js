const db = require('../db/db')

async function reservation(user_id) {
    const sql= `SELECT * FROM reservations JOIN vehicles ON reservations.vehicle_id = vehicles.vehicle_id WHERE user_id=?`
    const [result] = await db.query(sql, [user_id]);
    console.log(result);
    return result
}

async function checkAvailability(vehicle_id, pickup_date, return_date) {
    const sql = `SELECT * FROM reservations 
                 WHERE vehicle_id = ? 
                 AND status IN ('lefoglalva', 'active_rental')
                 AND ((pickup_date < ? AND return_date > ?) OR(pickup_date >= ? AND return_date <= ?))`
    const [conflicts] = await db.query(sql, [
        vehicle_id,
        pickup_date, return_date,
        pickup_date, return_date,
        pickup_date, return_date
    ]);

    console.log('Availability check conflicts:', conflicts.length);
    return conflicts;
}

async function newreservation(user_id,vehicle_id,pickup_date,return_date) {
    try {
        const conflicts = await checkAvailability(vehicle_id, pickup_date, return_date);
        
         
        if (conflicts && conflicts.length > 0) {
            console.log('Vehicle already booked for selected dates');
            throw new Error('Ez a jármű lefoglalt az adott időszakra');
        }

        const sql = 'INSERT INTO `reservations`(`reservation_id`, `user_id`, `vehicle_id`, `pickup_date`, `return_date`, `status`, `created_at`) VALUES (NULL,?,?,?,?,"lefoglalva",CURRENT_TIMESTAMP)'
        const [result] = await db.query(sql, [user_id,vehicle_id,pickup_date,return_date]);
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}


async function updatereservation(vehicle_id,pickup_date,return_date,status, reservation_id){
    const sql = 'UPDATE `reservations` SET `vehicle_id`=?,`pickup_date`=?,`return_date`=?,`status`=? WHERE `reservation_id`=?'
    const [result] = await db.query(sql, [vehicle_id,pickup_date,return_date,status,reservation_id])
    console.log(result);
    return result
}


async function deletereservation(reservation_id,user_id) {
    const sql='DELETE FROM `reservations` WHERE `reservation_id` = ? AND `user_id` = ?'
    const [result]= await db.query(sql,[reservation_id,user_id])
    console.log(result);
    return result
}

module.exports = {newreservation, updatereservation, deletereservation,reservation, checkAvailability}