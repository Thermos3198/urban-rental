const db = require('../db/db')

async function getcardata() {
    const sql = 'SELECT * FROM `vehicles`'; // Próbáld ki először JOIN nélkül, hogy lásd az adatot!
    const result = await db.query(sql); 
    // A mysql2/promise-nál a [rows, fields] jön vissza
    const rows = result[0]; 
    console.log("Backend küldi:", rows); 
    return rows; // Ez egy TÖMB: [{...}, {...}]
}

async function insernewvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day) {
    const sql = 'INSERT INTO `vehicles`(`vehicle_id`,`category_id`, `brand`, `model`, `color`, `transmission`, `license_plate`, `year`, `price_per_day`) VALUES (NULL,?,?,?,?,?,?,?,?)'
    const [result] = await db.query(sql, [category_id, brand, model, color, transmission, license_plate, year, price_per_day]);
    console.log(result);
    return result
}

async function editvehicle(brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id) {
    const sql = 'UPDATE `vehicles` SET `brand`=?,`model`=?,`color`=?,`transmission`=?,`license_plate`=?,`year`=? , `price_per_day`=? WHERE `vehicle_id`=?'
    const [result] = await db.query(sql, [brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id]);
    console.log(result);
    return result
}

async function deletevehicle(vehicle_id) {
    const sql = 'DELETE FROM `vehicles` WHERE `vehicle_id`=?'
    const [result] = await db.query(sql, [vehicle_id]);
    console.log(result);
    return result
}

module.exports = { getcardata, editvehicle, deletevehicle, insernewvehicle }