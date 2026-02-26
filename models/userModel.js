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
module.exports = {findByEmail, createUser, isValidEmail}