const multer = require("multer");
const path = require("path");

// const storage = multer.memoryStorage();
// // const upload = multer({ 
// //     storage: storage,
// //     limits: { fileSize: 2 * 1024 * 1024 },
// //  });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;
        cb(null, `${timestamp}-${originalname}`)
    }
});

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 2 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
 });

module.exports = upload;