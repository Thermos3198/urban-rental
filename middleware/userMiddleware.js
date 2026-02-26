const jwt=require('jsonwebtoken')
const config=require('../config/dotenvConfig')

function auth(req,res,next){
    const token=req.cookies?.[config.COOKIE_NAME]
    if(!token){
        return res.status(401).json({error: 'nincs cookie'})
    }
    try {
        req.user=jwt.verify(token,config.JWT_SECRET)
        //console.log(req.user);
        next()
    } catch (err) {
        return res.status(401).json({error: 'cookie error'})
    }
}


module.exports={auth}