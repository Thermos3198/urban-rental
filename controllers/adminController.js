const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, isValidEmail } = require('../models/adminModel.js')
const { insertVehicleImg, allVehicleImg, delCarImg } = require('../models/carImgModel.js')
const config = require('../config/dotenvConfig')
const { insernewvehicle, deletevehicle, editvehicle, getcardata } = require('../models/cardataModel')
const { viewalluser, adminedituser, Banusermod } = require('../models/userModel.js')
const { upload } = require('../middleware/uploadMiddleware.js')
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

const cookieOpts = {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7
}

async function login(req, res) {
    try {
        const { email, psw } = req.body
        console.log(email, psw);
        if (!email || !psw) {
            return res.status(400).json({ error: "email és jelszo kötelezö" })
        }
        const exists = await findByEmail(email)
        console.log(exists);
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: "Érvénytelen email formátum" })
        }

        if (psw.length < 8) {
            return res.status(400).json({ error: "A jelszó rövidebb mint 8 character" })
        }

        if (!exists) {
            return res.status(401).json({ error: 'hibás email' })
        }
        console.log("psw:", psw)
        console.log("exists.psw:", exists?.password)

        const ok = await bcrypt.compare(psw, exists.password)

        console.log(ok);
        if (!ok) {
            return res.status(401).json({ error: 'Hibás jelszó' })
        }
        const token = jwt.sign(
            { user_id: exists.user_id, username: exists.username, email: exists.email, role: exists.role, created_at: exists.created_at },
            config.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        )
        console.log(token);
        res.cookie(config.COOKIE_NAME, token, cookieOpts)
        return res.status(200).json({ message: 'Sikeres login' })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'belepesi hiba', err })
    }
}

async function whoAmI(req, res) {
    try {
        const { user_id, username, email, role } = req.user
        console.log(user_id, username, email, role);
        const exists = await findByEmail(email)
        return res.status(200).json({ user_id: exists.user_id, username: exists.username, email: exists.email, role: exists.role, created_at: exists.created_at })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'whoami server hiba' })
    }
}

async function logout(req, res) {
    try {
        return res.clearCookie(config.ADMINCOOKIE_NAME, { path: '/' }).status(200).json({ message: 'Sikeres kijelentkezes' })

    } catch (err) {
        return res.status(500).json({ error: 'logout server hiba' })
    }
}

async function carwithimgupload(req, res) {
    upload.array('img', 10)(req, res, async (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const { category_id, brand, model, color, transmission, license_plate, year, price_per_day } = req.body;

        try {
            // 1. Mentés az adatbázisba -> MEGVAN AZ ID
            const vehicle = await insernewvehicle(category_id, brand, model, color, transmission, license_plate, year, price_per_day);
            const vehicle_id = vehicle.insertId;

            // 2. Végleges mappa útvonala
            const targetDir = path.join(__dirname, '../public/carimgs', String(vehicle_id));

            // Mappa létrehozása (ha még nincs)
            await fs.mkdir(targetDir, { recursive: true });

            if (req.files && req.files.length > 0) {
                for (const file of req.files) {
                    const newPath = path.join(targetDir, file.filename);
                    const dbPath = `carimgs/${vehicle_id}/${file.filename}`;

                    // 3. Fájl ÁTMOZGATÁSA a temp-ből a végleges helyre
                    await fs.rename(file.path, newPath);

                    // 4. Kép útvonal mentése a DB-be
                    await insertVehicleImg(vehicle_id, dbPath);
                }
            }

            res.status(201).json({ message: "Sikeres feltöltés", vehicle_id });

        } catch (dbErr) {
            console.error(dbErr);
            res.status(500).json({ error: "Szerver hiba a mentésnél" });
        }
    });
}


async function delVehicleImg(req, res) {
    try {
        const { vehicle_id } = req.params
        const [result] = await delCarImg(vehicle_id)
        console.log(result);
        res.status(200).json({ message: "Sikeres törlés" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nem sikerült törölni", err })
    }
}




async function deletewholevehicle(req, res) {
    try {
        const { vehicle_id } = req.params
        console.log(vehicle_id);
        const [result] = await deletevehicle(vehicle_id)
        console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nem létezik ilyen" })
        }
        else {
            res.status(204).json({ message: "Sikeres törlés" })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}

async function editcar(req, res) {
    try {
        const { vehicle_id } = req.params
        const {category_id, brand, model, color, transmission, license_plate, year, price_per_day } = req.body
        console.log(brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id);
        const [result] = await editvehicle(category_id,brand, model, color, transmission, license_plate, year, price_per_day, vehicle_id)
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Sikeres modisitás" })
        }
        else {
            return res.status(404).json({ message: "Nem található" })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}


async function showcdwi(req, res) {
    try {
        const [result] = await getcardata()
        res.status(200).json({ result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nem sikerült lekérni", err })
    }
}

async function allusers(req, res) {
    try {
        const [result] = await viewalluser()
        res.status(200).json({ message: "Sikeres lekérés", result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nem sikerült lekérdezni", err })
    }
}
async function editoneuser(req, res) {
    try {
        const { user_id } = req.params
        const { username, email, password, role } = req.body
        const [result] = await adminedituser(username, email, password, role, user_id)
        console.log(result);
        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Sikeres modisitás" })
        }
        else {
            console.log('miért');
            res.status(404).json({ message: "Nem található" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nem sikerült modisitani", err })
    }
}
async function banuser(req, res) {
    try {
        const { user_id } = req.params
        const [result] = await Banusermod(user_id)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nem létezik ilyen" })
        }
        else {
            res.status(204).json({ message: "Sikeres törlés" })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nem sikerült törölni", err })
    }
}

module.exports = { login, whoAmI, logout, delVehicleImg, banuser, carwithimgupload, deletewholevehicle, editcar, showcdwi, allusers, editoneuser }