const express = require('express')
const cors = require('cors')

const app =  express();

app.use(cors())


app.get('/auth/spotify', (req,res)=>{
    //determine permission which our app can access
    const scopes = 'playlist-read-private'

    //after login user will be redirected here 
    const redirectURI= encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)

    res.redirect(`https://accounts.spotify.com/authorize
  ?client_id=${SPOTIFY_CLIENT_ID}
  &response_type=code
  &redirect_uri=${redirectURI}
  &scope=${scopes}`)

})


app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})