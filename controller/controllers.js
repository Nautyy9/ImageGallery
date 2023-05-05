

import {model, profile } from '../models/mongodb.js';

export const getSingleHero = async (req, res) => {
    try{
        const cookie = req.cookies
        // console.log(cookie.mail);
        const db = await model.find({userMail: cookie.mail})
        // const profiledb = await model.find({userMail: cookie.mail}, {_id: 1});
        // const getprofile = await profile.find();
        // const hehaw = getprofile.map((val) => (val._id.toString()));
        // const index = Math.floor(Math.random() * hehaw.length);
        // const data = hehaw[index];
        
        //find below will return all the objects from db having the mail specified and shows the one having profile whereas the exist will only return that object which is having the profile object only
        // const checkprofile = await model.find({userMail: {$eq: cookie.mail}, profile: {$exists: true}})
        // if(checkprofile.length === 0) {
        //     // console.log('inside');
        //     db[0].profile = data;
        //     await db[0].save();
        // }
        console.log( db, 'hehawwwww'); 
        res.status(200).json(db);
}
catch(err){
    res.status(404).json(({msg: err.message}));
}
}

export const postSingleHero = async (req, res) => {
    try{
        const cookie = req.cookies
        const db = await model.find()
        console.log(db)
        console.log(cookie, 'suiii');
        const file = req.file
        // console.log(file.fileName);
        if(db.length>=1 && cookie.profile && cookie.mail){
            const mgsave = new model({
                userMail : cookie.mail,
                fileName: file.filename,
                profile: cookie.profile,
                file: file.path,
                uploadTime: Date.now(), 
            })
            const finalfile = await mgsave.save();
            res.status(200).json(finalfile);
        }
        else if(db.length<1){
        const mgsave = new model({
            userMail : cookie.mail,
            fileName: file.filename,
            profile: cookie.profile,
            file: file.path,
            uploadTime: Date.now(), 
        })
        const finalfile = await mgsave.save();
        res.status(200).json(finalfile);
    }
    // const filename = req.file
    //const data = req.file.filename;
    
    }
    catch(err) {
        res.status(200).json(err.message);
    }
}


//--------------> profile post-->

// export const  postSingleHeroProfile = async (req, res) =>{
//     try{
//         const cookie = req.cookies
//         const data = req.body
//         const required = Object.keys(data)[0]
//         console.log(required, cookie);
//         // const db = await model.find({userMail: cookie.mail}, {_id: 1});
//         // const logger = await model.find({userMail: cookie.mail})
//         // if(db){
//         //     const hehaw = db.map((val) => (val._id.toString()));
//         //     console.log(hehaw, logger);
//         //     db[0].profile = hehaw;
//         //     if(value){
                
//         //     }
//         // }
//         const mgsave = new profile({
//             fileName: required,
//         })
//         const finalfile = await mgsave.save();
//         console.log(finalfile)
//         res.status(200).json('suii');
//     }
//     catch(err) {
//         console.log(err.message);
//     }
// }

export const getProfile = async  (req,res) =>{
    try{
        const getdb = await profile.find();
        console.log(getdb)
        if(getdb.length > 0){
            res.status(200).json(getdb);
        }
        else res.status(404).json({msg: 'No profile found'})
    }
    catch(err) {
        console.log(err.message);
    }
}