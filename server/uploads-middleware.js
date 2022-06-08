const path = require('path');
const multer = require('multer');
let imagesDirectory = path.join(__dirname, 'public/images/profile-images/');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (req.url === 'api/auth/gallery-images') {
      imagesDirectory = path.join(__dirname, 'public/images/profile-images/');
    }
    callback(null, imagesDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

const uploadsMiddleware = multer({ storage }).single('image');

module.exports = uploadsMiddleware;
