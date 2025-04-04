const express = require('express')
const axios = require('axios')
const router = new express.Router();
const querystring = require('querystring');
const {google} = require('googleapis')

const oauth2Client = new google.auth.OAuth2(
    process.env.YT_CLIENT_ID,
    process.env.YT_CLIENT_SECRET,
    process.env.YT_REDIRECT_URI
)




router.get('/' , (req, res)=>{
    const scopes = [
        "https://www.googleapis.com/auth/youtube.readonly",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]

    const authUrl = oauth2Client.generateAuthUrl({
        access_type:'offline',
        scope:scopes,
        prompt:'consent'
    });

    res.redirect(authUrl);
});

//callback handler
router.get('/callback' , async (req,res) => {
    try {
        const {code } = req.query;

        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        //set tokens securely
        res.cookie('yt_access_token' , tokens.access_token, {
            httpOnly: true,
            secure: true,
            maxAge: tokens.expiry_date - Date.now()
        });

        res.cookie('yt_refresh_token' , tokens.refresh_token, {
            httpOnly: true,
            secure: true,
        });

        res.redirect('http://localhost:5173/dashboard')
        
    } catch (error) {
        console.error('YouTube auth error:', error);
        res.redirect('/login?error=youtube_auth')
    }
})






module.exports = router