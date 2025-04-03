const express = require('express')
const router = new express.Router();
const axios = require('axios')
const queryString = require('query-string')
const {getPlaylists , getTracks} = require('../services/spotify')



router.get('/', (req, res) => {
    //determine permission which our app can access
    const scopes = 'playlist-read-private'

    //after login user will be redirected here with code
    const redirectURI = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)


    const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes}`;

    res.redirect(authUrl);
})



//helper function to exhange auth code for tokens
const getSpotifyTokens = async (code) => {
    try {

        const response = await axios.post('https://accounts.spotify.com/api/token',
            queryString.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString('base64')
                }
            }
        );

        return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            expires_in: response.data.expires_in

        }

    } catch (error) {
        console.log('Error getting spotify tokens:', error);

    }
}




router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query;

        const { access_token, refresh_token } = await getSpotifyTokens(code);

        //set secure http only token
        res.cookie('spotify_access_token', access_token, { httpOnly: true, secure: true })
        res.cookie('spotify_refresh_token', refresh_token, { httpOnly: true, secure: true })
        res.cookie('spotify_token_expiry', Date.now() + expires_in, { httpOnly: false, secure:true})

        res.redirect('/dashboard')
    } catch (error) {
        console.log('spotify :: callback error ::', error);
        
    }
})


router.get('/playlists',async (req,res)=>{
    try {
        const accessToken = req.cookies.spotify_access_token;
        const playlists = await getPlaylists(accessToken);
        res.json(playlists)
    } catch (error) {
        res.status(500).json({error:'Failed to fetch playlists'})
    }
})

router.get('/tracks/:playlistId', async (req,res) => {
    try {
        const accessToken = req.cookies.spotify_access_token;
        const tracks = await getTracks(req.params.playlistId, accessToken);
        res.json(tracks);      
    } catch (error) {
        res.status(500).json({error:'Failed to fetch tracks'})
    }
})



module.exports = router