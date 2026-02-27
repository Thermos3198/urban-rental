const db = require('../db/db')

async function getcardata() {
    const sql= 'SELECT  vehicle_category.name, vehicles.Brand, vehicles.model, vehicles.color, vehicles.transmission, vehicles.pass_number FROM `vehicles`INNER JOIN vehicle_category USING (category_id)'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}

module.exports = {getcardata}