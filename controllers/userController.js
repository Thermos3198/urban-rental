const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findByEmail, createUser, isValidEmail,insertUserImg, showuserprofilepic,edituserdata,deleteuserdata,getallcarswithimg} = require('../models/userModel.js')
const config = require('../config/dotenvConfig')
const db = require('../db/db.js')


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
        console.log(username,email,psw);
        if (!username || !email || !psw) {
            return res.status(400).json({ error: "Minden adatot megkell adni" })
        }
        
        if(!isValidEmail(email)){
            return res.status(400).json({error:"Érvénytelen email formátum"})
        }


        if(psw.contains<8){
            return res.status(400).json({error:"A jelszó rövidebb mint 8 character"})
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
        console.log(ok);
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
        console.log(req.user);
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const { user_id, username, email, role, created_at } = req.user
        console.log(user_id, username, email, role, created_at );

        return res.status(200).json({user_id: user_id, username: username, email: email, role: role, created_at: created_at })
    } catch (err) {
        console.log(err);
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

async function showuserprofile(req,res){
    try {
        console.log(req.user);
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const { user_id, username, email, role, created_at } = req.user
        console.log(user_id, username, email, role, created_at );
        const img= await showuserprofilepic(user_id)

        return res.status(200).json({user_id: user_id, username: username, email: email, role: role, created_at: created_at ,img:img})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'showuserprofile server hiba' })
    }
}

//never needed ts in the first place
async function newuserprofilepic(req,res){
    try {
        const {user_id} = req.params
        console.log(user_id);
        const img = `public/userpics/${user_id}/${req.file.filename}` 
        const [result] = await insertUserImg(user_id,img)
        console.log(result);
        res.status(201).json({message:"Sikeres feltöltés"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a feltöltésen", err })
    }
}

async function edituser(req, res) {
    try {
        const {user_id} = req.user
        const {username,email,password} = req.body
        console.log(username,email,password,user_id);
        const selecteduser=await currentUserfromid(user_id)
        const currentUser =selecteduser[0]
        const finalUsername = username && username.trim() !== "" ? username : currentUser.username;
        const finalEmail = email && email.trim() !== "" ? email : currentUser.email;
        
        let finalPassword = currentUser.password;

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            finalPassword = await bcrypt.hash(password, salt);
        }
        await db.query(
            'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?',
            [finalUsername, finalEmail, finalPassword, user_id]
        );

        res.status(200).json({ message: "Sikeres módosítás!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Hiba az editnél" });
    }
}


async function deleteuser(req,res){
    try {
        const {user_id} = req.params
        console.log(user_id);
        const [result] = await deleteuserdata(user_id)
        console.log(result);
        res.status(200).json({message:"Sikeres törlés"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}



async function viewcars(req,res){
    try {
        const result = await getallcarswithimg()
        console.log(result);
        res.status(200).json([result])
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a törléskor", err })
    }
}

//userreservation
const {reservation,newreservation,updatereservation,deletereservation}=require('../models/reserveModel.js')


async function viewReservations(req,res){
    try {
        const user_id = req.user.user_id
        console.log(user_id);
        const result = await reservation(user_id)
        console.log(result);
        res.status(201).json({message:"Sikeres lekérés",result})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a lekéréskor", err })
    }
}

async function NewReservations(req, res) {
    try {
        const { user_id, vehicle_id, pickup_date, return_date } = req.body;
        console.log(req.body);
        console.log(user_id, vehicle_id, pickup_date, return_date);
        
        if (!user_id || !vehicle_id || !pickup_date || !return_date) {
            return res.status(400).json({ error: "Minden adat kötelező (user_id, vehicle_id, pickup_date, return_date)" });
        }
        
        const result = await newreservation(user_id, vehicle_id, pickup_date, return_date);
        console.log(result);
        res.status(201).json({ message: "Sikeres lefoglalás", result });

    } catch (err) {
        console.log(err);
        if (err.message === 'Ez a jármű lefoglalt az adott időszakra') {
            return res.status(409).json({ error: err.message });
        }
        return res.status(500).json({ error: "Hiba a lefoglalásnál", err });
    }
}

async function UReservations(req,res){
    try {
        const {vehicle_id,pickup_date,return_date,status} = req.params
        console.log(vehicle_id,pickup_date,return_date,status);
        const result = await updatereservation(vehicle_id,pickup_date,return_date,status)
        console.log(result);
        res.status(201).json({message:"Sikeres modisitás"})

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Hiba a modisitáskor", err })
    }
}

async function DReservations(req, res) {
    try {
        const { reservation_id } = req.params;
        
        // Próbáld meg ezeket sorban, amíg az egyik nem lesz jó:
        const user_id = req.user?.user_id || req.user?.id || req.body.user_id;

        console.log("DEBUG - reservation_id:", reservation_id);
        console.log("DEBUG - user_id:", user_id); // Ennek NEM szabad undefined-nak lennie!

        const result = await deletereservation(reservation_id, user_id);
        
        res.status(200).json({ message: "Sikeres törlés", affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: "Hiba", details: err.message });
    }
}




module.exports = { register, login, whoAmI, logout, showuserprofile, newuserprofilepic,edituser,deleteuser,viewcars,viewReservations,NewReservations,UReservations,DReservations } 