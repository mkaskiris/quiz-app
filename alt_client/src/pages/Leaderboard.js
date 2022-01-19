import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Leaderboard() {
   const navigate = useNavigate()
   const [info, setInfo] = useState('')
   const [scoresList, setScoresList] = useState([])
   const [filter, setFilter] = useState('')

   useEffect(() => {
      async function getScores() {
         try {
            setInfo('Loading scores')
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

   function getTotalScore(entry) {
      delete entry._id
      let total = 0
      for(const key in entry)
         if(key !== 'name')
            total += entry[key]

      return total
   }

   const handleInput = e => {
      setFilter(e.target.value)
   }

   const handeClick = e => {
      navigate(e.target.value)
   }

   function ScoresList(props) {
      let list
      if(filter) {
         list = [...scoresList]
         list = list.filter(e => filter in e)
         list.sort((a, b) => b[filter] - a[filter])
         console.log(scoresList)
         console.log(list)
      } else {
         list = scoresList
      }
      list = list.slice(0, 10)
      return list.map((e, i) => <p key={`player${i}`}>{e.name}: {filter ? e[filter] : getTotalScore(e)}</p>)
   }

   return (
      <div>
         <h2>{info}</h2>
         <h1>Leaderboard</h1>
         <label>Filter by difficulty</label>
         <select onChange={handleInput} name="difficulty">
            <option value=''>All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
         </select>
         <div>
            <ScoresList difficultyFilter={filter}/>
         </div>
         <button onClick={handeClick} value={'/'}>Home</button>
      </div>
   )
}

export default Leaderboard