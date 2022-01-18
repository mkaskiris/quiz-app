import { useState, useContext } from 'react'
import Context from "../utils/Context"

function QuestionsPage() {
   const { triviaData, setTriviaData } = useContext(Context)
   const [questionIndex, setQuestionIndex] = useState(0)
   console.log(triviaData)

   function Question() {
      const data = triviaData[questionIndex]
      const options = [...data.incorrect_answers, data.correct_answer]
      options.sort(() => Math.random() - 0.5)
      return(
         <div className="w3-card-4 w3-container w3-pale-blue">
            <h1>Question for { data.player.name } </h1>
            <h2>{ data.player.questionNo} of { triviaData.amount }</h2>
            <h3>{data.question}</h3>
            { options.map((e, i) => <button key={`option${i}`}>{ e }</button>) }
         </div>
      )
   }

   return (
      <div className="w3-content w3-container w3-margin-top">
         { triviaData ? <Question />: <h1>Nothing Here</h1> }
      </div>
   )
}

export default QuestionsPage;