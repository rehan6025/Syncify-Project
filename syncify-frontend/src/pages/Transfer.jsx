import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


function Transfer() {
  const navigate = useNavigate();
  const spotifyConnected = useSelector(state => state.auth.spotifyConnected);
  const youtubeConnected = useSelector(state => state.auth.youtubeConnected);
  const playlists =[];

  useEffect(()=>{
    if(!spotifyConnected || !youtubeConnected){
      alert('Please connect both Spotify and Youtube to start transfer!');
      navigate('/profile')
    }
    console.log('spotifytoken: ', spotifyConnected);
    console.log('youtubetoken: ', youtubeConnected);
    
  }, [spotifyConnected, youtubeConnected]);


  
  useEffect(()=>{
    const fetchPlaylists = async () => {
      const res = await fetch('http://localhost:3000/auth/spotify');
      playlists = res;
    }
  },[])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Transfer Playlists</h1>
      <p>Both service connected. Select a playlist to begin transfer</p>

      {playlists ? playlists.map(playlist => (
        
      ))}
    </div>
  )
}

export default Transfer
