const fs = require("fs");
const express = require("express");
const multer = require("multer");
const download=require('./download')
const OAuth2Data = require("./credentials.json");
var name,pic

const { google } = require("googleapis");

const app = express();


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
var authed = false;

// If modifying these scopes, delete token.json.
const SCOPES =
  "https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";

app.set("view engine", "ejs");

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("file"); //Field name and max count

app.get("/", (req, res) => {
  if (!authed) {
    // Generate an OAuth URL and redirect there
    var url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log(url);
    res.render("index", { url: url });
  } else {
    var oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    oauth2.userinfo.get(function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(response.data);
        name = response.data.name
        pic = response.data.picture
        res.render("success", {
          name: response.data.name,
          pic: response.data.picture,
          success:false
        });
      }
    });
  }
});

app.post("/upload", (req, res) => {
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
            res.render("success",{name:name,pic:pic,success:true})
          }

        }
      );
    }
  });
});

app.get('/logout',(req,res) => {
    authed = false
    res.redirect('/')
})

app.get("/google/callback", function (req, res) {
  const code = req.query.code;
  console.log({code:code})
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.log("Error authenticating");
        console.log(err);
      } else {
        console.log("Successfully authenticated");
        console.log(tokens)
        oAuth2Client.setCredentials(tokens);


        authed = true;
        res.redirect("/");
      }
    });
  }
});
// app.get('/download', (req, res) => {
//   download('1eclWjO9PPfdNpAU73667n-EunQfmQGnQ').then(e=>{
//     console.log(e)
//     res.send(e);
//   })
// });

app.get('/downloadAFile', (req, res) => {
  // oAuth2Client.getToken('4/0AY0e-g5rokrBFE2gzBewVVV3WXJdl2CfmIfVp2K4_kX3REggyESvqNqltaxvTYl5rCyLLg', function (err, tokens) {
  //   if (err) {
  //     console.log("Error authenticating");
  //     console.log(err);
  //   } else {
  //     console.log("Successfully authenticated");
  //     // console.log(tokens)
      


  //     authed = true;
  //     res.redirect("/");
  //   }
  // });
  oAuth2Client.setCredentials({
    access_token: 'ya29.a0AfH6SMCIlj_hFkRhatzO6nGpmIOwVh1oGzpilxsl0nHWF4kWKeZ4ONcyRXGGd-KBYGz1Ma4ljWBJTuGAKWxeI_aNB8Ltv40-OHtG8b2A286C-a33-gFC40nF_QyJsBmxwK5vZ7HAf8-Qw-fwS8GsS1ZfEqnvWd01wnA4Armt5fWH',
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile',
    token_type: 'Bearer',
    id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1MmZjYjk3ZGY1YjZiNGY2ZDFhODg1ZjFlNjNkYzRhOWNkMjMwYzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNjIxODU3MDEwMTEtOTUyaXM2ZWx1NnU4MjRhMTg0azBrMWhnZnNsYzk5anYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTUzNzUzNjE4NTA4MTc0MjkyMzUiLCJhdF9oYXNoIjoiZDkxUWVLR1EyVXdFS1QxV20wVS1vQSIsIm5hbWUiOiJBa3JhbW92IE95YmVrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoTVhxbGx5Q3pNbEhsSnRrd2hReGd3R2dfQzdnSXZyb3JSa19ZZj1zOTYtYyIsImdpdmVuX25hbWUiOiJBa3JhbW92IiwiZmFtaWx5X25hbWUiOiJPeWJlayIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjEwMzM2ODE3LCJleHAiOjE2MTAzNDA0MTd9.bEW0a37KL1IbGck-_fcNBjeHQ2ZcD6iO_esrHGZjbQSq7GieVA-L9RMZTP1E3fH262Af3FEqfAVYjadTOH7HSqXQfHl7aKBbzEh0k5iSpVT0mebeGiWfF5au6ncsjuFyq9RsBo_310rZ_TOUoCbmDVJusAmQvl2xtXn_5iUHfdyfK6RwE_C6WeoUW6r58bRzGyJ6XT7CMQS3UoRfrHleGxddESZdlRySrpPVLK6IfeIeKz_Txe2Cr44h6oIuvpUMLzrYvvdc_c3T2xFhSLyA_ZPQhAK-IP1CBKGat0kX8Msihk8AOsaPdp8NBbj5RPbKhDiNB3mRV-r5-ZNAlWNTkQ',
    expiry_date: 1610340416330
  });
  var dir = `./downloads`; // directory from where node.js will look for downloaded file from google drive

  var fileId = '1eclWjO9PPfdNpAU73667n-EunQfmQGnQ'; // Desired file id to download from  google drive

  var dest = fs.createWriteStream('./downloads/kamal-hossain.jpg'); // file path where google drive function will save the file

  const drive = google.drive({ version: 'v3', auth:oAuth2Client }); // Authenticating drive API

  let progress = 0; // This will contain the download progress amount
  // Uploading Single image to drive
  drive.files
    .get({ fileId, alt: 'media' }, { responseType: 'stream' })
    .then((driveResponse) => {
      driveResponse.data
        .on('end', () => {
          console.log('\nDone downloading file.');
          const file = `${dir}/kamal-hossain.jpg`; // file path from where node.js will send file to the requested user
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
});
app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
