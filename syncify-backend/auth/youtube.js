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


router.get('/user', async (req,res) => {
    try {
        const youtube = google.youtube('v3');
        const people = google.people('v1');

        //get youtube channel info 
        const channelResponse = await youtube.channels.list({
            auth :  oauth2Client,
            part : 'snippet',
            mine :  true
        })

        const profileResponse = await people.people.get({
            auth:  oauth2Client,
            resourceName: 'people/me',
            personFields: 'names,emailAddresses,photos'
        });

        res.json({
            channel:channelResponse.data.items[0],
            profile:profileResponse.data
        })



    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
})

router.post('/playlists', async (req,res) => {
    try {
        const {title, description} = req.body;
        const youtube = google.youtube('v3')

        const response = await youtube.playlists.insert({
            auth: oauth2Client,
            part: 'snippet,status',
            requestBody: {
                snippet: {
                    title: title,
                    description: description || 'Created via Syncify'
                },
                status: {
                    privacyStatus: 'private'
                }
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating playlist:', error);
        res.status(500).json({ error: 'Failed to create playlist' });
    }
})

router.post('/playlists/:playlistsId/items', async (req,res) => {
    try {
        const {playlistId} = req.params;
        const {videoId} = req.body;
        const youtube = google.youtube('v3')

        const response = await youtube.playlistItems.insert({
            auth: oauth2Client,
            part: 'snippet',
            requestBody: {
                snippet: {
                    playlistId: playlistId,
                    resourceId: {
                        kind:'youtube#video',
                        videoId: videoId
                    }
                }
            }
        })

        res.json(response.data)


    } catch (error) {   
        
        console.error('Error adding video:' , error);
        res.status(500).json({error : 'Failed to add video'})

    }    
})

router.get('/search', async (req, res) => {
    try {
        const {q} = req.query;
        const youtube = google.youtube('v3');

        const response = await youtube.search.list({
            auth : oauth2Client,
            part : 'snippet',
            q: `${q} official music video`,
            type: 'video',
            maxResults: 1
        });

        if(response.data.items.length > 0){
            const video = response.data.items[0];
            res.json({
                videoId: video.id.videoId,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.default.url
            });
        }else{
            res.status(404).json({error : "No video found"})
        }
    } catch (error) {
        console.error('search error:', error)
        res.status(500).json({error:'search failed'});
    }
});





module.exports = router