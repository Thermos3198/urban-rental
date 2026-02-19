const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser } = require('../models/userModel.js')
const config = require('../config/dotenvConfig')

const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function register(req, res) {
    try {
        const { username, email, psw } = req.body
        //console.log(username,email,psw);
        if (!username || !email || !psw) {
            return res.status(400).json({ error: "Minden adatot megkell adni" })
        }
        const exists = await findByEmail(email)
        console.log(exists);
        if (exists !==null) {
            return res.status(409).json({ error: 'Az email vagy a username már foglalt' })
        }

        const hash = await bcrypt.hash(psw, 10)
        console.log(hash);

        const { insertId } = await createUser(username, email, hash)

        return res.status(201).json({ message: "Siker!", insertId })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Regisztracio sikertelen!", err })
    }

}


async function login(req, res) {
    try {
        const { email, psw } = req.body
        console.log(email);

        if (!email || !psw) {
            return res.status(400).json({ error: "email és jelszo kötelezö" })
        }
        const exists = await findByEmail(email)

        if (!exists) {
            return res.status(401).json({ error: 'hibás email' })
        }
        console.log(exists);
        console.log("psw:", psw);
        console.log("exists.password:", exists.user_id);
        const ok = await bcrypt.compare(psw, exists.password);
        if (!ok) {
            return res.status(401).json({ error: 'Hibás jelszó' });
        }
        const token = jwt.sign(
            { 
                user_id: exists.user_id, 
                username: exists.username, 
                email: exists.email, 
                role: exists.role, 
                created_at: exists.created_at 
            },config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )

        res.cookie(config.COOKIE_NAME, token, cookieOpts)
        return res.status(200).json({ message: 'Sikeres login' })



    } catch (err) {
        console.error("Login error stack:", err.stack || err);
        return res.status(500).json({ error: 'belepesi hiba', details: err.message || err });
    }
}

async function whoAmI(req, res) {
    try {
        const { user_id, username, email, role } = req.user
        //console.log(user_id,username,email,role);
        return res.status(200).json({ user_id: user_id, username: username, email: email, role: role, created_at: exists.created_at })
    } catch (err) {
        return res.status(500).json({ error: 'whoami server hiba' })
    }
}

async function logout(req, res) {
    try {
        return res.clearCookie(config.COOKIE_NAME, { path: '/' }).status(200).json({ message: 'Sikeres kijelentkezes' })

    } catch (err) {
        return res.status(500).json({ error: 'logout server hiba' })
    }
}

module.exports = { register, login, whoAmI, logout }