const request = require('request')
const fs = require('fs')
///1-

request.get({
    url: 'http://moodle.buxdu.uz/'
}, (error, response, body) => {
    console.log("error:", error)
    fs.writeFile('000000.html', body, function (err) {
        if (err) throw err;
        console.log('Saved!-1');
    });
    console.log(-1)
})

//2
request.post({
    url: 'http://213.230.96.51:8072/login/index.php',
    form: {
        username: "600001849",
        password: "600001849",
        logintoken: '0jzUFpbQ0tGTzFxrgDFrEuiNWetY3WLz',

        rememberusername: "1",
        anchor: ""

    }
}, (error, response, body) => {
    console.log("error:", error)
    fs.writeFile('mynewfile1.html', body, function (err) {
        if (err) throw err;
        console.log('Saved!00');
    });
    //  console.log(body)
    //  console.log("response",response)
    console.log(0, response.statusCode)


})

//3
request.get({
    url: 'http://213.230.96.51:8072/'
}, (error, response, body) => {
    console.log("error:", error)
    fs.writeFile('mynewfile2.html', body, function (err) {
        if (err) throw err;
        console.log('Saved!1');
    });
    console.log(1)

})


//4
request.get({
    url: 'http://213.230.96.51:8072/course/view.php?id=2942'
}, (error, response, body) => {
    console.log("error:", error)
    console.log('body')
    fs.writeFile('mynewfile3.html', body, function (err) {
        if (err) throw err;
        console.log('Saved!+++++++++++++++++++++++++++++++++++++');
    }); //  console.log("response",response)
    // console.log("body",' ',body)
})