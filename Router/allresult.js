const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Test = require('../models/test').Test
const { Result } = require('../models/result')
const signUp = require('../models/student').Student



router.get('/allresult', async (req, res) => {
    console.log(req.session.userId)
    let natija = await Result.find(studentId==req.session.userId)
    console.log(natija)
    res.send('ok google')

})

module.exports=router