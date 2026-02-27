const db = require('../db/db')

async function addNewMaintenance(vehicle_id,description) {
    const sql= 'INSERT INTO `maintenance_record`(`vehicle_id`, `description`, `maintenance_date`, `status`) VALUES (?,?,CURRENT_TIMESTAMP,"elkezdödött")'
    const [result] = await db.query(sql,[vehicle_id,description]);
    console.log(result);
    return result
}

async function editMaintenance(vehicle_id,description,maintenance_date,status ,maintenance_id) {
    const sql= 'UPDATE `maintenance_record` SET `vehicle_id`=?,`description`=?,`maintenance_date`=?,`status`=? WHERE maintenance_id=?'
    const [result] = await db.query(sql,[vehicle_id,description,maintenance_date,status,maintenance_id]);
    console.log(result);
    return result
}

async function maintenancedone(maintenance_id) {
    const sql= 'UPDATE `maintenance_record` SET `description`="javitások befejezödtek",`maintenance_date`=CURRENT_TIMESTAMP,`status`="kész" WHERE maintenance_id=?'
    const [result] = await db.query(sql,[maintenance_id]);
    console.log(result);
    return result
}

module.exports = {addNewMaintenance, editMaintenance,maintenancedone}