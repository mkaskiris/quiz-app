import axios from 'axios'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from "../utils/Context"

function ResultsPage() {
   const { triviaData, setTriviaData } = useContext(Context)
   const navigate = useNavigate()

   useEffect(() => {
      async function sendData() {
         try {
            const scores = []
            for(const e in triviaData.scores) {
               scores.push({name: e, [triviaData.questions[0].difficulty]: triviaData.scores[e]})
            }
            await axios.post('https://quiz-app-lap3.herokuapp.com/users/upsert', { entries: scores })
         } catch(err) {
            console.warn(err)
         }
      }

      if(!triviaData)
         navigate('/')
      else
         sendData()

      return () => setTriviaData('')
   }, [])
   
   function getScores() {
      const scores = []
      
      for(const e in triviaData.scores) {
         scores.push({name: e, score: triviaData.scores[e]})
      }
      scores.sort((a, b) => b.score - a.score)
      return scores.map((e, i) => <h2 key={`player${i}`}>{`${e.name}: ${e.score}`}</h2>)
   }

   const handeClick = e => {
      navigate(e.target.value)
   }

   return (
      <div className="w3-content w3-container w3-margin-top">
         { triviaData &&
         <>
            <div className="w3-card-4 w3-container">
               <h2>Score Summary</h2>
               {getScores()}
            </div>
            <div>
               <button onClick={handeClick} value={'/'}>Home</button>
               <button onClick={handeClick} value={'/create_quiz'}>Play again</button>
               <button onClick={handeClick} value={'/leaderboard'}>Leaderboard</button>
            </div>
         </>
         }
      </div>
   )
}

export default ResultsPage;