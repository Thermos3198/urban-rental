const db = require('../db/db')

async function getcardata() {
    const sql= 'SELECT  vehicle_category.name, vehicles.brand, vehicles.model, vehicles.color, vehicles.transmission, vehicles.license_plate FROM `vehicles`INNER JOIN vehicle_category USING (category_id)'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

async function insernewvehicle(category_id, brand, model, color, transmission, license_plate,year,price_per_day){
    const sql='INSERT INTO `vehicles`(`category_id`, `brand`, `model`, `color`, `transmission`, `license_plate`, `year`, `price_per_day`) VALUES (?,?,?,?,?,?,?,?)'
    const [result] = await db.query(sql,[category_id, brand, model, color, transmission, license_plate,year,price_per_day]);
    console.log(result);
    return result
}

async function editvehicle(category_id, brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id){
    const sql='UPDATE `vehicles` SET `category_id`=?,`brand`=?,`model`=?,`color`=?,`transmission`=?,`license_plate`=?,`year`=? , `price_per_day`=? WHERE `vehicle_id`=?'
    const [result] = await db.query(sql,[category_id, brand, model, color, transmission, license_plate,year,price_per_day,vehicle_id]);
    console.log(result);
    return result
}

async function deletevehicle(vehicle_id){
    const sql='DELETE FROM `vehicles` WHERE `vehicle_id`=?'
    const [result] = await db.query(sql,[vehicle_id]);
    console.log(result);
    return result
}

module.exports = {getcardata, insernewvehicle,editvehicle,deletevehicle}