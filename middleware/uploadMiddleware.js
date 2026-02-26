const multer = require('multer')
const fs = require('fs')
const path = require('path')

const MAX_FILE_SIZE = 1024 * 1024 * 20



const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        ;
        const {vehicle_id} = req.params
        
        if (!vehicle_id) {
            return cb (new Error('Hiányzsik a kocsi id'),null)
        }

        const uploadDir = path.join(process.cwd(), "uploads",String(vehicle_id))
       

        try {
            fs.mkdirSync(uploadDir,{recursive: true})
            cb(null,uploadDir)
        } catch (err) {
            return cb(new Error('Nem sikerült létrehozzni mappát'),null) 
        }
    },

    filename: (req,file,cb)=>{
        const now = new Date().toISOString().split('T')[0]
        return cb(null,`${file.originalname}-${now}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: MAX_FILE_SIZE},
    fileFilter:(req,file,cb)=>{
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
        const mimeType = fileTypes.test(file.mimetype)
        if (extName&&mimeType) {
            return cb(null,true)
        }
        return cb(new Error('csak képeket lehet feltölteni'),null);
    }
})

module.exports = {upload}