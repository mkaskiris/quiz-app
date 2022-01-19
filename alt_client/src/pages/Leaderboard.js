import { useState, useEffect } from 'react'
import axios from 'axios'

function Leaderboard() {
   const [info, setInfo] = useState('')
   const [scoresList, setScoresList] = useState([])
   const [filteredList, setFilteredList] = useState('')
   const [difficulty, setDifficulty] = useState('all')

   useEffect(() => {
      async function getScores() {
         try {
            const { data } = await axios.get('https://quiz-app-lap3.herokuapp.com/users')
            data.entries.sort((a, b) => getTotalScore(b) - getTotalScore(a))
            setScoresList(data.entries)
            setInfo('')
         } catch(err) {
            setInfo(`There has been an issue ${err.message}`)
         }
      }

      getScores()
   }, [])

   useEffect(() => {
      if(difficulty !== 'all')
         setFilteredList(difficulty)
      else
         setFilteredList('')
   }, [difficulty])

   function getTotalScore(entry) {
      delete entry._id
      let total = 0
      for(const key in entry)
         if(key !== 'name')
            total += entry[key]
      return total
   }

   const handleInput = e => {
      setDifficulty(e.target.value)
   }
/*
   function ScoresList(props) {

      return
   }*/

   return (
      <div>
         <h2>{info}</h2>
         <h1>Leaderboard</h1>
         <label>Select difficulty</label>
         <select onChange={handleInput} name="difficulty">
            <option value='all'>All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
         </select>
         <div>
            { scoresList.map((e, i) => <p key={`player${i}`}>{e.name}: {getTotalScore(e)}</p>) }
         </div>
      </div>
   )
}

export default Leaderboard