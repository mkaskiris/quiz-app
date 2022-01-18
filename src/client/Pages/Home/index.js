import React from 'react';
import { NavLink } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './index.css';

const Home = () =>{
    return(
        <>  
            <h1 className='title'>The Quiz Game</h1>
            <Nav className='d-grid gap-2'>
                <Button href='./leaderboards' variant='outline-primary' size='lg'>Leaderboard</Button>
                <Button href='./leaderboards' variant='outline-primary' size='lg' >Create new game</Button>
                <Button href='./leaderboards' variant='outline-primary' size='lg'>Create online game</Button>
                <Button href='./leaderboards' variant='outline-primary' size='lg'>Join online game</Button>
            </Nav>    
        </>
    );
}

export default Home;