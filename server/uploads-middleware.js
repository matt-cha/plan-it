import path from 'path';
import multer from 'multer';

const imagesDirectory = 'public/images'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, imagesDirectory);
  },
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
    callback(null, name);
  }
});

export const uploadsMiddleware = multer({ storage }).single('image');
