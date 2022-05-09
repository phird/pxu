import express from 'express';
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }})

router.get('/', (req, res) => {
    res.send('Hello Upload')
    })

router.post('/', upload.array('files', 2), (req, res) => {
    console.log(req.file);
    res.send(req.file)
})
export default router;