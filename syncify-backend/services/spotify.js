const axios = require('axios')

exports.getPlaylist = async (accessToken) => {
    try {
        let playlists = []
        let url = 'https://api.spotify.com/v1/me/playlists?limit=50';

        while (url) {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!res.data?.items) {
                throw new Error('Invalid Spotify API response');
            }

            playlists.push(...res.data.items);

            url = res.data.next;
        }
        return playlists;
    } catch (error) {
        console.error('Failed to fetch playlists:', error);
        
    }
}

exports.getTracks = async (playlistId, accessToken) => {
    const res = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return res.data.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artist[0].name,
        duration: item.track.duration_ms
    }))
}