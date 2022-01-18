import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Context from './utils/Context'

function App() {
   const [triviaData, setTriviaData] = useState('')

   return (
      <div className="App">
         <Context.Provider value={{triviaData, setTriviaData}}>
            <header className="w3-text-purple w3-xxlarge w3-center">
               Quiz App
            </header>
            <main className="w3-padding-32">
               <Outlet />
            </main>
         </Context.Provider>
      </div>
  );
}

export default App;
