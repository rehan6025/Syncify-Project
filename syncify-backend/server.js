const express = require('express')
const cors = require('cors')

const app =  express();
const spotifyRouter = require('./auth/spotify')



app.use(cors())
app.use('/auth/spotify', spotifyRouter)


app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
})