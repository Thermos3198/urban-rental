const jwt=require('jsonwebtoken')
const config=require('../config/dotenvConfig')

function auth(req,res,next){
    const token=req.cookies?.[config.COOKIE_NAME]
    console.log(config.COOKIE_NAME);
    if(!token){
        return res.status(401).json({error: 'Nem vagy bejelentkezve'})
    }
    try {
        req.user=jwt.verify(token,config.JWT_SECRET)
        console.log(req.user);
        next()
    } catch (err) {
        return res.status(401).json({error: 'cookie error'})
    }
}


module.exports={auth}