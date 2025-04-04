const express = require('express')
const cors = require('cors')

const app = express();
const spotifyRouter = require('./auth/spotify')
const youtubeRouter = require('./auth/youtube')



app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/auth/spotify', spotifyRouter)
app.use('/auth/youtube',)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
})