const db = require('../db/db')

async function getcardata() {
    const sql= 'SELECT * FROM `vehicles` JOIN vehicles_img USING (vehicle_id) GROUP BY vehicle_id;'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

async function insernewvehicle(category_id, brand, model, color, transmission, license_plate,year,price_per_day){
    const sql='INSERT INTO `vehicles`(`vehicle_id`,`category_id`, `brand`, `model`, `color`, `transmission`, `license_plate`, `year`, `price_per_day`) VALUES (NULL,?,?,?,?,?,?,?,?)'
    const [result] = await db.query(sql,[category_id, brand, model, color, transmission, license_plate, year,price_per_day]);
    console.log(result);
    return result
}

async function editvehicle(brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id){
    const sql='UPDATE `vehicles` SET `brand`=?,`model`=?,`color`=?,`transmission`=?,`license_plate`=?,`year`=? , `price_per_day`=? WHERE `vehicle_id`=?'
    const [result] = await db.query(sql,[brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id]);
    console.log(result);
    return result
}

async function deletevehicle(vehicle_id){
    const sql='DELETE FROM `vehicles` WHERE `vehicle_id`=?'
    const [result] = await db.query(sql,[vehicle_id]);
    console.log(result);
    return result
}

module.exports = {getcardata,editvehicle,deletevehicle,insernewvehicle}