import express from "express"
import { getSingleHero, postSingleHero , getProfile, deletePicture} from "../controller/controllers.js";
import multer from "multer";

const route = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file, "dest")
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        console.log(file , "filename");
        cb(null, Date.now() + '.webp');
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp')
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
route.post('/gallery', upload.single('image'), postSingleHero);
route.get('/get-profile', getProfile)
route.post('/gallery/image', deletePicture);
// route.post('/profile', postSingleHeroProfile)
// route.get('/gallery.html', getSingleHero);
export default route;