const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fs=require('fs')
const path=require('path')
const {google}=require('googleapis')

const {Theme} = require('../../models/test');
const {Course} = require('../../models/course');
const {blocked}=require('../../middleware/auth');
const multer = require('multer');
function downloadAFile(file_id) {
    oAuth2Client.setCredentials({
        access_token: 'ya29.a0AfH6SMCIlj_hFkRhatzO6nGpmIOwVh1oGzpilxsl0nHWF4kWKeZ4ONcyRXGGd-KBYGz1Ma4ljWBJTuGAKWxeI_aNB8Ltv40-OHtG8b2A286C-a33-gFC40nF_QyJsBmxwK5vZ7HAf8-Qw-fwS8GsS1ZfEqnvWd01wnA4Armt5fWH',
        scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile',
        token_type: 'Bearer',
        id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MmZjYjk3ZGY1YjZiNGY2ZDFhODg1ZjFlNjNkYzRhOWNkMjMwYzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUzNzUzNjE4NTA4MTc0MjkyMzUiLCJhdF9oYXNoIjoiZDkxUWVLR1EyVXdFS1QxV20wVS1vQSIsIm5hbWUiOiJBa3JhbW92IE95YmVrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoTVhxbGx5Q3pNbEhsSnRrd2hReGd3R2dfQzdnSXZyb3JSa19ZZj1zOTYtYyIsImdpdmVuX25hbWUiOiJBa3JhbW92IiwiZmFtaWx5X25hbWUiOiJPeWJlayIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjEwMzM2ODE3LCJleHAiOjE2MTAzNDA0MTd9.bEW0a37KL1IbGck-_fcNBjeHQ2ZcD6iO_esrHGZjbQSq7GieVA-L9RMZTP1E3fH262Af3FEqfAVYjadTOH7HSqXQfHl7aKBbzEh0k5iSpVT0mebeGiWfF5au6ncsjuFyq9RsBo_310rZ_TOUoCbmDVJusAmQvl2xtXn_5iUHfdyfK6RwE_C6WeoUW6r58bRzGyJ6XT7CMQS3UoRfrHleGxddESZdlRySrpPVLK6IfeIeKz_Txe2Cr44h6oIuvpUMLzrYvvdc_c3T2xFhSLyA_ZPQhAK-IP1CBKGat0kX8Msihk8AOsaPdp8NBbj5RPbKhDiNB3mRV-r5-ZNAlWNTkQ',
        expiry_date: 1610340416330
      });
      var dir = `./downloads`; // directory from where node.js will look for downloaded file from google drive
    
      var fileId = file_id; // Desired file id to download from  google drive
    
      var dest = fs.createWriteStream('../../views/downloads/quizlar.doc'); // file path where google drive function will save the file
    
      const drive = google.drive({ version: 'v3', auth:oAuth2Client }); // Authenticating drive API
    
      let progress = 0; // This will contain the download progress amount
      // Uploading Single image to drive
      drive.files
        .get({ fileId, alt: 'media' }, { responseType: 'stream' })
        .then((driveResponse) => {
          driveResponse.data
            .on('end', () => {
              console.log('\nDone downloading file.');
              const file = `${dir}/quizlar.doc`; // file path from where node.js will send file to the requested user
              res.download(file); // Set disposition and send it.
            })
            .on('error', (err) => {
              console.error('Error downloading file.');
            })
            .on('data', (d) => {
              progress += d.length;
              if (process.stdout.isTTY) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`Downloaded ${progress} bytes`);
              }
            })
            .pipe(dest);
        })
        .catch((err) => console.log(err));
        return "quizlar.doc"
}
const OAuth2Data = require("./credentials.json");
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({
  access_token: 'ya29.a0AfH6SMC7akic7xYuXsSvIhdeE2WiK518OwGwpG5dW5ZIZxTAOwV48NchxSWjW0ivAaqPi4o8l--MI24TMB9pJ7j8fCMDA4nDW2wSgoz6X2kSrVOJ0iV8hxJm4aZyn5IGhqmYpPpQh4BwLkjrxOVoIxFVVpUzp6bVQSprA06BJ9RM',
  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile',
  token_type: 'Bearer',
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MmZjYjk3ZGY1YjZiNGY2ZDFhODg1ZjFlNjNkYzRhOWNkMjMwYzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUzNzUzNjE4NTA4MTc0MjkyMzUiLCJhdF9oYXNoIjoiaHhuSFotWVYxWnM2YzV1b2tnem85dyIsIm5hbWUiOiJBa3JhbW92IE95YmVrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoTVhxbGx5Q3pNbEhsSnRrd2hReGd3R2dfQzdnSXZyb3JSa19ZZj1zOTYtYyIsImdpdmVuX25hbWUiOiJBa3JhbW92IiwiZmFtaWx5X25hbWUiOiJPeWJlayIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjEwMzU0NDA5LCJleHAiOjE2MTAzNTgwMDl9.xi477vzO5DbgH2bFArPyPVJ0W9u5-f5Om2DKH9ZkUD1ehEoXDljWe0_89Y2FMcMcCWQMqXmj0Vf-xXeZrPm2KG5EIdbaWknGFh1RjijgbqzDZNCP77Ie97NkSjSkSOVBz_UoSDkCfSVGjzRHTkYJ7qabjgPaVNpJJBj9TDElSPI4n0p6mCWJ-hayolKdB_4WfJf-YMGUbIMZRCnc1REcS704y5bLM5cyJVoFCCyYKNhNIQCsGT4_8z9EjiVMWmJG_V-QhezXGTwEO8JKaFUC6fNiXN9XsOceDozNYHGUv-U0daujvznuZT8VSL1EjqV1dnhOWFkr5G2nj7c_tjBFkg',     
  expiry_date: 1610358008721
});
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./views/uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
  
  var upload = multer({
    storage: Storage,
  }).single("file");
router.get('/:id',async (req,res)=>{
    let themes=await Theme.find({"courseId":req.params.id})
  
    res.render('Tmavzular',{themes:themes,id:req.params.id});

})
router.get('/downloadAFile/:fId',(req,res)=>{
    const filename0=downloadAFile(req.params.fId)
    res.send(__dirname+'/views/uploads/'+filename0)
})


router.post('/:id',blocked,async(req, res) => {
//Bu yerda Joi validatsiya
const myCourse=await Course.findById(req.params.id)
if(!myCourse){
 return   res.status(404).send("Bunday kurs mavjud emas!!!");
}
if(myCourse.trainer._id!=req.session.teacherId){
  return  res.status(403).send("Ushbu kursga mavzu qo'shishga sizga ruxsat berilmagan!!!");
}

upload(req, res, function (err) {
  if (err) {
    console.log(err);
    return res.end("Something went wrong");
  } else {
    console.log(req.file.path);
    const drive = google.drive({ version: "v3",auth:oAuth2Client  });
    const fileMetadata = {
      name: req.file.filename,
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id"
      },
      (err, file) => {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          fs.unlinkSync(req.file.path)
          console.log({id:file.data.id})
          console.log(file)
          const theme=new Theme({
            name:req.body.name,
            data:file.data.id,
            courseId:req.params.id
        })
        theme.save().then((info)=>{
             res.redirect('/teacher/addtheme/'+req.params.id);
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:err});
        }).finally(()=>{})
          
        }

      }
    );
  }
});
    
 


});



module.exports={router,downloadAFile}