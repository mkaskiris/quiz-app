import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, GameCreation, JoinGame, LeaderBoard, Scores, Quiz} from './client/Pages'
import { BackButton } from './client/components';

import axios from 'axios';

function App() {
    const [ questions, setQuestions ] = useState()
    const [ name, setName ] = useState()
    const [score, setScore] = useState(0);

    const fetchQuestions = async (category = "", difficulty = "") => {
        const { data } = await axios.get(
          `https://opentdb.com/api.php?amount=10${
            category && `&category=${category}`
          }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
        );
    
        setQuestions(data.results);
      };

    return (
        <div id ="app">
            <BackButton />
            <main>
                <Routes>
                   <Route path='/' element={<Home />} />
                   <Route path='/create/local' element={<GameCreation 
                                                            name={name}
                                                            setName={setName}
                                                            fetchQuestions={fetchQuestions}/>} />
                   <Route path='/quiz' element={<Quiz
                                                    name={name}
                                                    questions={questions}
                                                    score={score}
                                                    setScore={setScore}
                                                    setQuestions={setQuestions} />} />
                   <Route path='/result' element={<Scores   
                                                    name={name}
                                                    score={score} />} />

                   <Route path='/create/online' element={<GameCreation />} />
                   <Route path='/join' element={<JoinGame />} />
                   <Route path='/leaderboards' element={<LeaderBoard />} />
                </Routes>
         </main>
        </div> 
    )
}

export default App;
