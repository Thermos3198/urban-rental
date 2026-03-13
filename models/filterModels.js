const db = require('../db/db')

async function CFirstCars() {
    const sql= 'SELECT * FROM `vehicles` ORDER BY `price_per_day` ASC'
    const [result] = await db.query(sql);
    console.log(result);
    return result
}
//expend this more

module.exports = {CFirstCars}