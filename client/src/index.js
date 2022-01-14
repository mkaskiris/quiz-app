import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SearchRepo from './pages/SearchRepo';
import RepoPage from './pages/RepoPage';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />}>
               <Route index element={<SearchRepo />}/>
               <Route path="/repo_page" element={<RepoPage />}>
                  <Route path=":name" element={<RepoPage />} />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

