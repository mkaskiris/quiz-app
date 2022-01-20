import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Context from "../utils/Context"

function CreateQuiz() {
   const { setTriviaData } = useContext(Context)
   const [formData, setFormData] = useState({ amount: '5', category: 'any', difficulty: 'easy'})
   const [player, setPlayer] = useState('')
   const [players, addPlayers] = useState([])
   const [categoryList, setCategoryList] = useState([]);
   const [info, setInfo] = useState('')
   const [loadingQuiz, setLoadingQuiz] = useState(false)
   const navigate = useNavigate()

   async function getTriviaData(data) {
      try {
         const res = await axios.get(data.url)
         data.questions = res.data.results
         let i = 0
         let counter = 1
         while(i <= data.questions.length - players.length) {
            for(let k = 0; k < players.length; k++) {
               data.questions[i+k].player = { name: players[k], questionNo: counter }
            }
            i += players.length
            counter++
         }
         setTriviaData(data)
         navigate("/questions_page")
      } catch (err) {
         setInfo(err.response.data.message || err.message)
      }
   }

   useEffect(() => {
      async function getCategories() {
         try{
            let { data } = await axios.get(`https://opentdb.com/api_category.php`)
            setCategoryList(data.trivia_categories);
            setInfo('');
        }catch(err){
            setInfo(`There has been an issue ${err.message}`)
        }
      }
      getCategories()
   }, [])

   function submitPlayer(e) {
      e.preventDefault()
      if(player) {
         addPlayers(state => [...state, player])
         setPlayer('')
      }
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
      e.preventDefault()
      setInfo('Get ready!')
      setLoadingQuiz(true)
      const data = { amount:parseInt(formData.amount) <  5 ? 5 : parseInt(formData.amount) }
      let url = `https://opentdb.com/api.php?amount=${data.amount * players.length}`
      for(const key in formData) {
         if(key !== 'amount' && formData[key] !== 'any')
            url += `&${key}=${formData[key]}`
      }
      data.url = url
      data.scores = { }
      players.forEach(e => data.scores[e] = 0)
      getTriviaData(data)
   }

   return (
      <div className="w3-content w3-container w3-margin-top">
         <h3>{info}</h3>
         { !loadingQuiz &&
         <>
            <div className="w3-card-4 w3-container w3-pale-blue">
               <h1>Create quiz</h1>
               <form onSubmit={ submitPlayer }>
                  <input role="create" className='w3-margin-right' type="text" name="name" value={player} placeholder="Enter player name" onChange={handlePlayer} />
                  <input role="submit" className="w3-button w3-purple w3-round-xlarge" type="submit" value="Add" />
               </form>
            </div>
            { players.length > 0 &&
               <>
                  <h3>Players</h3>
                  { players.map((e, i) => <li key={`player${i}`}>{e}</li>)}
               <form onSubmit={ submitForm }>
                  <label htmlFor="amount">Enter number of questions</label>
                  <input className='w3-margin-right' type="number" min="5" name="amount" value={formData.amount} onChange={handleInput} />
                  <label>Select difficulty</label>
                  <select role="difficulty" onChange={handleInput} name="difficulty">
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Hard</option>
                  </select>
                  <label htmlFor="category">Select category</label>
                  <select role="category" onChange={handleInput} name="category">
                     <option value="any">Any</option>
                     { categoryList.map(category => <option key={category.id} value={category.id}>{category.name}</option>) }
                  </select>
                  <input role="submit-options" className="w3-button w3-purple w3-round-xlarge" type="submit" value="Start" />
               </form>
               </>
            }
         </>
         }
      </div>
   )
}

export default CreateQuiz;