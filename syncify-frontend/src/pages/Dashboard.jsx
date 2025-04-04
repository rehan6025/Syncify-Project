import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = 'http://localhost:3000/auth/spotify/logout';
  };

  const logoutFromSpotify = async() => {

    await fetch("http://localhost:3000/auth/logout", {
      credentials: "include", // send cookies if needed
    });

    localStorage.removeItem('spotify_access_token')


    const spotifyLogoutWindow = window.open(
      "https://accounts.spotify.com/logout",
      "Spotify Logout", 
      "width=500 , height=600"
    );

    setTimeout(() => {
      spotifyLogoutWindow?.close();
      navigate("/login");
    }, 2000);
  }
  


  return (
    <div>
      <h1>hello, successfully logged in</h1>
      <button onClick={logoutFromSpotify}>Logout</button>
    </div>
  )
}

export default Dashboard
