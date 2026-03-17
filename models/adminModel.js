const db = require('../db/db')

async function findByEmail(email) {
    //console.log("findByEmail keresés erre:", email);
    const [result] = await db.query('SELECT * FROM users WHERE email = ? AND `role`="admin"', [email]);
    //console.log(result);
    return result[0] || null
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = {findByEmail,isValidEmail}