import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () =>{
    return(
        <>
            <h1>The Quiz Game</h1>
            <nav>
                <NavLink className='leaderboards' to='/leaderboards'><button className='homebtn'>Leaderboard</button></NavLink>
                <NavLink className='local' to='/create/local'><button className='homebtn'>Create new game</button></NavLink>
                <NavLink className='online' to='/create/online'><button className='homebtn'>Create online game</button></NavLink>
                <NavLink className='join' to='/join'><button className='homebtn'>Join online game</button></NavLink>
            </nav>    
        </>

        );
}

export default Home;