import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setSpotifyConnected, setYoutubeConnected } from "../features/authSlice";

function Profile() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchStatus = async () => {
      const res = await fetch('http://localhost:3000/auth/status', {
        credentials:'include'
      });

      const data = await res.json();
      
      

      if(data.spotifyConnected){
        dispatch(setSpotifyConnected(true));
      }
      if(data.youtubeConnected){
        dispatch(setYoutubeConnected(true));
      }
    };

    fetchStatus();
  },[dispatch])

  return (
    <div className="p-4 font-bold text-2xl">Welcome to your profile</div>
  )
}

export default Profile
