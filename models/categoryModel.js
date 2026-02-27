const db = require('../db/db')

async function addNewcategory(name) {
    const sql='INSERT INTO `vehicle_category`(`category_id`, `name`) VALUES (NULL,?)'
    const [result] = await db.query(sql,[name]);
    return result
}

async function updateCategory(name,category_id) {
    const sql='UPDATE `vehicle_category` SET `name`=? WHERE `category_id`=?'
    const [result] = await db.query(sql,[name,category_id]);
    return result
}
async function deleteCategory(category_id) {
    const sql='DELETE FROM `vehicle_category` WHERE `category_id`=?'
    const [result] = await db.query(sql,[category_id]);
    return result
}


module.exports = {addNewcategory,updateCategory,deleteCategory}