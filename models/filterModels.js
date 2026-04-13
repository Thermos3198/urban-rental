const db = require('../db/db')


async function filterVehicles(filters) {
    let sql = 'SELECT * FROM `vehicles` JOIN vehicles_img USING (vehicle_id) WHERE 1=1'
    const params = []

    if (filters.transmission && filters.transmission.trim() !== '') {
        sql += ' AND `transmission` = ?'
        params.push(filters.transmission)
    }

    if (filters.sort_order === 'high_to_low') {
        sql += ' ORDER BY `price_per_day` DESC'
    } else {
        sql += ' ORDER BY `price_per_day` ASC'
    }

    const [result] = await db.query(sql, params)
    console.log(result)
    if (Array.isArray(result)) {
        return result
    }
    return [result]
}

module.exports = { filterVehicles }