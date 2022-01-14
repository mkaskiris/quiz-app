import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, GameCreation, JoinGame, LeaderBoard } from './client/Pages'
import { BackButton } from './client/components';

function App() {
    return (
        <div id ="app">
            <BackButton />
            <main>
                <Routes>
                   <Route path='/' element={<Home />} />
                   <Route path='/create/local' element={<GameCreation />} />
                   <Route path='/create/online' element={<GameCreation />} />
                   <Route path='/join' element={<JoinGame />} />
                   <Route path='/leaderboards' element={<LeaderBoard />} />
                </Routes>
         </main>
        </div> 
    )
}

export default App;
