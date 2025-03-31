const express = require('express')
const router = new express.Router();



router.get('/', (req,res)=>{
    //determine permission which our app can access
    const scopes = 'playlist-read-private'

    //after login user will be redirected here with code
    const redirectURI= encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)


    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes}`;
    
    res.redirect(authUrl);
})


router.get('/callback' , async (req,res) => {
    const { code } = req.query;
})


module.exports = router