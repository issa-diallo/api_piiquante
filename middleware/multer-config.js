const multer = require('multer')

// Multer configuration
const MIME_TYPES = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
}
/**
 * Storage configuration for multer.
 */
const storage = multer.diskStorage({
    // Destination of the file in the server.
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Name of the file in the server.
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_')
        // Get the extension of the file.
        const extension = MIME_TYPES[file.mimetype]
        // Create a new filename with the original name and the extension.
        callback(null, name + Date.now() + '.' + extension)
    },
})

module.exports = multer({ storage }).single('image')
