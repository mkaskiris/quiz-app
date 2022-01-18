import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Context from "../utils/Context"
import data from '../sampleData.json'

function CreateQuiz() {
   const { setTriviaData } = useContext(Context)
   const [formData, setFormData] = useState({ amount: '', category: '', difficulty: ''})
   const [player, setPlayer] = useState('')
   const [players, addPlayers] = useState([])
   const [error, setError] = useState('')
   const navigate = useNavigate();
   /*
   async function getTriviaData() {
      try {
         const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`)
         setTriviaData(data)
         setError('')
      } catch (err) {
         setError(err.response.data.message || err.message)
      }
   }*/

   function submitPlayer(e) {
      e.preventDefault()
      addPlayers(state => [...state, player])
      setPlayer('')
   }

   const handleInput = e => {
      const { name, value } = e.target
      setFormData({ ...formData, [name]: value })
   }

   const handlePlayer = e => {
      const { value } = e.target
      setPlayer(value)
   }

   function submitForm(e) {
      //getTriviaData()
      e.preventDefault()
      data = data.results
      let i = 0
      let counter = 1
      while(i <= data.length - players.length) {
         for(let k = 0; k < players.length; k++) {
            data[i+k].player = { name: players[k], questionNo: counter }
         }
         i += players.length
         counter++
      }
      data.amount = parseInt(formData.amount)
      setTriviaData(data)
      navigate("/questions_page");
   }

   return (
      <div className="w3-content w3-container w3-margin-top">
         <div className="w3-card-4 w3-container w3-pale-blue">
            <h1>Create quiz - minimum 2 players</h1>
            <form onSubmit={ submitPlayer }>
               <input className='w3-margin-right' type="text" name="name" value={player} placeholder="Enter player name" onChange={handlePlayer} />
               <input className="w3-button w3-purple w3-round-xlarge" type="submit" value="Add" />
            </form>
            <h3>{error}</h3>
         </div>
         { players.length > 0 &&
               <>
                  <h3>Players</h3>
                  { players.map((e, i) => <li key={`player${i}`}>{e}</li>)}
               </>
         }
         { players.length > 1 &&
            <form onSubmit={ submitForm }>
               <input className='w3-margin-right' type="text" name="amount" value={formData.amount} placeholder="Enter number of questions" onChange={handleInput} />
               <input className='w3-margin-right' type="text" name="category" value={formData.category} placeholder="Enter category" onChange={handleInput} />
               <input className='w3-margin-right' type="text" name="difficulty" value={formData.difficulty} placeholder="Enter difficulty" onChange={handleInput} />
               <input className="w3-button w3-purple w3-round-xlarge" type="submit" value="Start" />
            </form>
         }
      </div>
   )
}

export default CreateQuiz;