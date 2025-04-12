import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';

function Navbar() {
    const {spotifyConnected , youtubeConnected} = useSelector(state => state.auth);

    return (
        <nav className='bg-gray-700 p-4 text-white'>
            <div className='flex justify-baseline items-center'>
                <Link to='/' className='text-xl font-bold'>Synify</Link>
                <div className='ml-5 flex gap-4 items-center'>
                    <Link to='/transfer' >Transfer</Link>
                    <Link to='/profile'>Profile</Link>
                    {spotifyConnected? (
                        <span>Spotify ✅</span> 
                    ) : (
                        <ConnectButton service="spotify"/>   
                    )}

                    {youtubeConnected? (
                        <span>Youtube ✅</span>
                    ):(
                        <ConnectButton service="youtube"/>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
