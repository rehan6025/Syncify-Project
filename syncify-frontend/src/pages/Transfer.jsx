import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import PlaylistCard from '../components/PlaylistCard';


function Transfer() {
  const navigate = useNavigate();
  const spotifyConnected = useSelector(state => state.auth.spotifyConnected);
  const youtubeConnected = useSelector(state => state.auth.youtubeConnected);
  const [playlists, setPlaylists] = useState([]);
 
  useEffect(() => {
    if (!spotifyConnected || !youtubeConnected) {
      alert('Please connect both Spotify and Youtube to start transfer!');
      navigate('/profile')
    }

  }, [spotifyConnected, youtubeConnected , navigate]);



  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch('http://localhost:3000/auth/spotify/playlists', {
        credentials: "include"
      });
      const data = await res.json();
      setPlaylists(data);

    }

    fetchPlaylists();
  }, [])

  const handleSelect = (playlistId)=>{
    navigate(`/transfer/${playlistId}`);
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Transfer Playlists</h1>
      <p className="text-gray-600 mb-6">
        Select a playlist to transfer to YouTube
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map(playlist => (
          <PlaylistCard 
            key={playlist.id}
            playlist={playlist}
            onSelect={() => handleSelect(playlist.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Transfer
