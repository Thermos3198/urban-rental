const db = require('../db/db')

async function insertVehicleImg(vehicle_id,img) {
    const sql = 'INSERT INTO `vehicles_img`(`vehicle_id`, `img`) VALUES (?,?)'
    const [result] = await db.query(sql,[vehicle_id,img])
    console.log(result);
    return [result]
}
async function allVehicleImg() {
    const sql = 'SELECT vehicle_id,img FROM `vehicles_img` JOIN vehicles USING (vehicle_id) GROUP BY vehicle_id'
    const [result] = await db.query(sql)
    return result;
}
async function delVehicleImg(vehicle_id,img){
    const sql = 'DELETE FROM `vehicles_img` WHERE `vehicle_id`=? AND img=?'
    const [result] = await db.query(sql,[vehicle_id,img])
    return result
}

module.exports = {insertVehicleImg,allVehicleImg,delVehicleImg}