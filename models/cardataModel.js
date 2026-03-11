const db = require('../db/db')

async function getcardata() {
    const sql= 'SELECT  vehicle_category.name, vehicles.Brand, vehicles.model, vehicles.color, vehicles.transmission, vehicles.pass_number FROM `vehicles`INNER JOIN vehicle_category USING (category_id)'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

async function insernewvehicle(category_id, Brand, model, color, transmission, pass_number){
    const sql='INSERT INTO `vehicles`(`category_id`, `Brand`, `model`, `color`, `transmission`, `pass_number`) VALUES (?,?,?,?,?,?)'
    const [result] = await db.query(sql,[category_id, Brand, model, color, transmission, pass_number]);
    console.log(result);
    return result
}

async function editvehicle(category_id, Brand, model, color, transmission, pass_number,vehicle_id){
    const sql='UPDATE `vehicles` SET `category_id`=?,`Brand`=?,`model`=?,`color`=?,`transmission`=?,`pass_number`=? WHERE `vehicle_id`=?'
    const [result] = await db.query(sql,[category_id, Brand, model, color, transmission, pass_number,vehicle_id]);
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