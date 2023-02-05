import express from "express"
import * as dotenv from "dotenv"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import route from "./routes/route.js";
import cookieParser from 'cookie-parser'
dotenv.config();

const app = express();
// const __filename = fileURLToPath(import.meta.url);

//---->
// Returns a StorageEngine implementation configured to store files in memory as Buffer objects.

// This snippet makes sure that the file is parsed and stored in the memory.
//-----x

// const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(cookieParser())
app.use(express.static('./public'));
app.use('/Images',express.static('Images'))
app.use('/Profile',express.static('Profile'))

// app.get('*', function (req, res) {    
//     const protocol = req.protocol;
//     const host = req.hostname;
//     const url = req.originalUrl;
//     const port = process.env.PORT || PORT;

//     const fullUrl = `${protocol}://${host}:${port}${url}`
//     console.log(fullUrl);
//     const responseString = `Full URL is: ${fullUrl}`;                       
//     res.send(responseString);  
// })


app.use('', route);

app.get( '/', async (req,res) => {
    // res.sendFile('public/index.html', {root : __dirname });
} )
app.post( '/', async (req,res) =>{
    const data = req.body
    // res.clearCookie('mail')
    const mail = Object.keys(data)[0];
    console.log(mail);
    
    // localStorage.setItem('mail', mail)
})
mongoose.connect(process.env.DB_URL)
.then(()  =>
   {
    app.listen(5000, () => { 
        console.log(" User has been connected to http://localhost:5000");
    })
})
.catch((err) =>{
    console.log(err.message);
})

