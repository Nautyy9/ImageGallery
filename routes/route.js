import express from "express"
import path from "path"
import { getSingleHero, postSingleHero , getProfile} from "../controller/controllers.js";
import multer from "multer";
const route = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file, "dest")
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        console.log(file , "filename");
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb( null, true); //accept a file
    }
    else {
        cb(new Error("File should be of jpeg or png format"), false); //reject file
    }

}
const upload = multer({
    storage: storage,
    limits : {
        fileSize: 1024*1024*20
        },
    fileFilter: fileFilter

})


route.get('/gallery', getSingleHero);
route.post('/gallery',upload.single('image'), postSingleHero);
route.get('/get-profile', getProfile)
// route.post('/profile', postSingleHeroProfile)
// route.get('/gallery.html', getSingleHero);
export default route;