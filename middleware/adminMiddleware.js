const jwt=require('jsonwebtoken')
const config=require('../config/dotenvConfig')

function admin(req,res,next){
    
    if(req.user.role!=="admin"){
        return res.status(409).json({error: 'nem vagy admin'})
    }
    next()
}
module.exports={admin}