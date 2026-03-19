const multer = require('multer');
const fs = require('fs');
const path = require('path');

const MAX_FILE_SIZE = 1024 * 1024 * 20; // 20MB

const storage = multer.diskStorage({
    destination: './public/carimgs/temp', // Ideiglenes hely
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif|svg|webp|avif|bmp|tiff/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) return cb(null, true);
        cb(new Error('Csak képeket lehet feltölteni'), false);
    }
});

module.exports = { upload };