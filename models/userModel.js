const db = require('../db/db')

async function findByEmail(email) {
    //console.log("findByEmail keresés erre:", email);
    const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    //console.log(result);
    return result[0] || null
}

async function createUser(username,email,hash){
    const sql = 'INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `created_at`) VALUES (NULL, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
    const [result] = await db.query(sql, [username, email, hash, "user"])
    //console.log(result);
    return {insertId: result.insertId}
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function insertUserImg(user_id,img){
    const sql = 'INSERT INTO `users_img`(`user_id`, `user_img`) VALUES (?,?)'
    const [result] = await db.query(sql,[user_id,img])
    console.log(result);
    return [result]
}

async function showuserprofilepic(user_id){
    const sql='SELECT `user_img` FROM `users_img` WHERE `user_id`=?'
    const [result] = await db.query(sql,[user_id])
    console.log(result);
    return [result]
}

async function edituserdata(username,email,password,user_id){
    const sql='UPDATE `users` SET `username`=?,`email`=?,`password`=? WHERE `user_id`=?'
    const [result] = await db.query(sql,[username,email,password,user_id])
    console.log(result);
    return [result]
}

async function deleteuserdata(user_id){
    const sql='DELETE FROM `users` WHERE `user_id`=?'
    const [result] = await db.query(sql,[user_id])
    console.log(result);
    return [result]
}


module.exports = {findByEmail, createUser, isValidEmail, insertUserImg,showuserprofilepic,edituserdata,deleteuserdata}