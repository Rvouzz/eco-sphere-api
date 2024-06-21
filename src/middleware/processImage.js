const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
    try {
        const files = req.files || [req.file];

        // Skip image processing if files is undefined or empty
        if (!files || files.length === 0 || files[0] === undefined) {
            return next();
        }

        // Filter out any undefined or invalid files
        const validFiles = files.filter(file => file && file.filename);

        if (validFiles.length === 0) {
            return next();
        }

        await Promise.all(validFiles.map(async (file) => {
            const filePath = path.join('public/images', file.filename);
            const outputFilePath = path.join('public/images', `new-${file.filename}`);

            // Menentukan format file
            const ext = path.extname(file.originalname).toLowerCase();
            const isJPEG = ext === '.jpg' || ext === '.jpeg';
            const isPNG = ext === '.png';

            // Proses gambar dengan Sharp
            let sharpInstance = sharp(filePath).resize(800); // Mengubah ukuran gambar jika diperlukan
            if (isJPEG) {
                sharpInstance = sharpInstance.jpeg({ quality: 50 }); // Menurunkan kualitas JPG menjadi 50%
            } else if (isPNG) {
                sharpInstance = sharpInstance.png({ quality: 50, compressionLevel: 9 }); // Menurunkan kualitas PNG menjadi 50%
            }
            await sharpInstance.toFile(outputFilePath);

            // Hapus file asli jika tidak diperlukan lagi
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            }

            // Update file untuk menunjuk ke file yang diproses
            file.path = outputFilePath;
            file.filename = `new-${file.filename}`;
        }));

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Error processing image.',success: false});
    }
};

module.exports = processImage;
