import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Context from './utils/Context'

function App() {
   const [repoData, setRepoData] = useState('')

   return (
      <div className="App">
         <Context.Provider value={{repoData, setRepoData}}>
            <header className="w3-text-purple w3-xxlarge w3-center">
               Git Repo App
            </header>
            <main className="w3-padding-32">
               <Outlet />
            </main>
         </Context.Provider>
      </div>
  );
}

export default App;
