const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const spotifyRouter = require('./auth/spotify')
const youtubeRouter = require('./auth/youtube')


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use('/auth/spotify', spotifyRouter)
app.use('/auth/youtube', youtubeRouter)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
})