import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CreateQuiz from './pages/CreateQuiz'
import Questions from './pages/Questions'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />}>
               <Route index element={<CreateQuiz />}/>
               <Route path="/questions_page" element={<Questions />} />
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

