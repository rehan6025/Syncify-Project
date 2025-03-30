import React from 'react'

function Login() {

    const handleSpotifyLogin = ()=>{
        window.location.href = 'http://localhost:3000/auth/spotify';
    }

    return (
        <div>
            <button onClick={handleSpotifyLogin}>Login with Spotify</button>
        </div>
    )
}

export default Login
