const express = require('express')
const axios = require('axios')
const router = new express.Router();
const querystring = require('querystring');
const {google} = require('googleapis')



router.get('/' , (req, res)=>{
    const scopes = [
        "https://www.googleapis.com/auth/youtube"
    ]
} )






module.exports = router