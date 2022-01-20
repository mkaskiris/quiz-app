import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigateButton from '../components/NavigateButton'
import Context from "../utils/Context"

function QuestionsPage() {
   const { triviaData, setTriviaData } = useContext(Context)
   const navigate = useNavigate()
   const [questionIndex, setQuestionIndex] = useState(0)
   const [selected, setSelected] = useState('')
   const [score, setScore] = useState(0)
   const [counter, setCounter] = useState(10);
   const [options, setOptions] = useState(initOptions())
   

   function initOptions() {
      if(triviaData) {
         const data = triviaData.questions[questionIndex]
         const opts = [...data.incorrect_answers, data.correct_answer]
         return (opts.sort(() => Math.random() - 0.5))
      }
   }

   useEffect(() => {
      if(!triviaData)
         navigate('/')
   }, [])

   useEffect(() => {
      let timer
      let delay

      function next() {
         delay = setTimeout(() => questionIndex === triviaData.questions.length - 1 ? navigate('/results_page') : setQuestionIndex(state => state + 1), 2000)
      }

      if (counter > 0) {
        timer = setTimeout(() => setCounter(c => c - 1), 1000)
      } else {
         setSelected('unanswered')
         next()
      }

      if(selected && timer) {
         clearTimeout(timer)
         next()
      }

      return () => {
         if (timer) {
            clearTimeout(timer);
         }
         if (delay)
            clearTimeout(delay)
      }
    }, [counter, selected]);

   useEffect(() => {
      if(selected) {
         const data = triviaData.questions[questionIndex]
         const scores = { ...triviaData.scores }
         const score  = selected === data.correct_answer ? 1 : 0
         scores[data.player.name] += score
         setScore(state => state + score)
         setTriviaData({ ...triviaData, scores})
      }
         
   }, [selected])

   useEffect(() => {
      if(triviaData) {
         setOptions(initOptions())
         setScore(triviaData.scores[triviaData.questions[questionIndex].player.name])
         setCounter(10)
         setSelected('')
      }
   }, [questionIndex])

   function Question() {
      
      function handleCheck(e) {
         const { value } = e.target
         setSelected(value)
      }

      const getButtonColour = value => {
         let colour = "questionButtons"
         if(selected) {
            if(value === selected)
               value === triviaData.questions[questionIndex].correct_answer ? colour = "w3-green" : colour = "w3-red"
            else if(value === triviaData.questions[questionIndex].correct_answer)
                  colour = "w3-green"
         }
         return colour
      }

      return(
         <div className="questions">
            { Object.keys(triviaData.scores).length > 1 && <h1 className='q'>Question for { triviaData.questions[questionIndex].player.name } </h1>}
            <h2 className='q'>{ triviaData.questions[questionIndex].player.questionNo} of { triviaData.amount }</h2>
            <h3 className='q'>{triviaData.questions[questionIndex].question}</h3>
               { options.map((e, i) => <button key={`option${i}`} className={"questionButtons " + getButtonColour(e)} value={e} onClick={ handleCheck } disabled={selected}>{ e }</button>) }
         </div>
      )
   }

   const handleClick = e => {
      navigate(e.target.value)
   }

   return (
      <div >
         { triviaData &&
            <div>
               <div className="questiontitle">
                  <h2>Score: {score}</h2>
                  <h3>Timer: {counter}</h3>
               </div>
               <Question />
               <div className='buttonsContainer'>
               <NavigateButton navigatePath={'/'} buttonText="Quit" />
               </div>
            </div>
         }
      </div>
   )
}

export default QuestionsPage;