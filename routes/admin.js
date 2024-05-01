const express = require('express');
const router = express.Router();

const controller = require('../controller/admin');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

const upload = multer({ storage });


//test routes
router.get('/test',(req,res,next) =>{
    res.status(404).send('<h1>Hello World</h1>');
})

router.post('/postRestaurant', upload.single('image'), controller.postRestaurant);
router.post('/postNewDish',upload.single('image'),controller.postNewDish);
// router.post('/getDishID/:id',upload.single('image'),controller.getDishID);


module.exports = router;