const db = require('../db/db')


async function filterVehicles(filters) {
    let sql = 'SELECT * FROM `vehicles` JOIN vehicles_img USING (vehicle_id) WHERE 1=1'
    const params = []

    if (filters.brand && filters.brand.trim() !== '') {
        sql += ' AND `brand` LIKE ?'
        params.push(`%${filters.brand}%`)
    }

    if (filters.color && filters.color.trim() !== '') {
        sql += ' AND `color` LIKE ?'
        params.push(`%${filters.color}%`)
    }

    if (filters.transmission && filters.transmission.trim() !== '') {
        sql += ' AND `transmission` = ?'
        params.push(filters.transmission)
    }

    if (filters.year) {
        sql += ' AND `year` = ?'
        params.push(filters.year)
    }

    if (filters.min_price !== undefined && filters.min_price !== null) {
        sql += ' AND `price_per_day` >= ?'
        params.push(filters.min_price)
    }

    if (filters.max_price !== undefined && filters.max_price !== null) {
        sql += ' AND `price_per_day` <= ?'
        params.push(filters.max_price)
    }

    if (filters.sort_order === 'high_to_low') {
        sql += ' ORDER BY `price_per_day` DESC'
    } else {
        sql += ' ORDER BY `price_per_day` ASC'
    }

    const [result] = await db.query(sql, params)
    console.log(result)
    
    // Ensure we return an array
    if (Array.isArray(result)) {
        return result
    }
    return [result]
}

module.exports = {filterVehicles}