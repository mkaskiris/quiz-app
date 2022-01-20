import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Context from './utils/Context'

function App() {
   const [triviaData, setTriviaData] = useState('')

   return (
      <div className="App">
         <Context.Provider value={{triviaData, setTriviaData}}>
            <header className="Name">
               Quiz App
            </header>
            <main className="">
               <Outlet />
            </main>
         </Context.Provider>
      </div>
  );
}

export default App;
