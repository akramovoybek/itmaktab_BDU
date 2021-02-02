const express = require('express');

const app=express.Router()

const expressDefend = require('express-defend');
const blacklist = require('express-blacklist');

app.use(blacklist.blockRequests('blacklist.txt'));
app.use(expressDefend.protect({ 
    maxAttempts: 5, 
    dropSuspiciousRequest: true, 
    logFile: 'suspicious.log', 
    onMaxAttemptsReached: function(ipAddress, url){
        blacklist.addAddress(ipAddress);
    } 
}));
