import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Quiz = ({url}) =>{
    const [questions, setQuestions] = useState([])
    const [status, setStatus] = useState('Loading')
    const [counter, setCounter] = useState(0)
    
    const [answered, setAnswered] = useState(false)
    const [ answers, setAnswers] = useState([])
    
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [error, setError] = useState(false);
    
    const Check = (i) => {
        setSelectedAnswer(i);
        if (i === correct) setScore(score + 1);
        setError(false); 
    }

   

    const nextQuestion = () => {
        setCounter((prevState) => prevState + 1)
        setAnswered(false);
    }

    const fetchQuestions = async () =>{
        setStatus('Loading')
        try{
            console.log(url)
            let {data} = await axios.get(url)
            console.log(data.results)
            setQuestions(data.results)
            setStatus('')

        }catch (err){
            throw new Error(err.message)
        }
    }
    useEffect(()=>{
        fetchQuestions()
    },[])

    function createMarkup(string){
        return {__html: string}
    }

    function incrementCounter(){
        setCounter(counter => counter + 1)
    }

    function shuffle(questions, counter){
        console.log(`I have been called`)
        return [...questions[counter].incorrect_answers, questions[counter].correct_answer].sort(()=> Math.random() - 0.5)
    }

    
    const AnswerBtn = ({questions, counter, ans}) =>{
        const [shuffle, setShuffle] = useState('Loading')
        const [score, setScore] = useState(0)
        //setShuffle('Loading')
        //const ans = [...questions[counter].incorrect_answers, questions[counter].correct_answer].sort(()=> Math.random() - 0.5)
        //setShuffle('')

        const handleAnswer = e =>{
            e.target.style.backgroundColor = 'red'
            if(e.target.value === questions[counter.correct_answer]){
                setScore(score=>score+1)
            }
            setAnswered(true);
        }

        return (
            <>
            {ans.map(a=><button 
                            className= 'homebtn' 
                            disabled={answered} 
                            style={answered && a === questions[counter].correct_answer ? {backgroundColor: 'green'}: {backgroundColor: 'white'} }
                            onClick={handleAnswer} 
                            dangerouslySetInnerHTML={createMarkup(a)} 
                            key={a} 
                            value={a}/>)}
            <h1>Score: {score}</h1>
            </>
        )
    }

    return (
        <div className='container'>
            {status ? <h1>{status}</h1>:            
                <>  <h1>{counter + 1} / 10</h1>
                    <h2 dangerouslySetInnerHTML={createMarkup(questions[counter].question)}/>
                    {}
                    <AnswerBtn questions={questions} counter={counter} ans={shuffle(questions,counter)} />
                    {answered ? <button onClick={incrementCounter}>Next</button> : <></>}
                </> }
            <button  className='next' onClick={nextQuestion}>Next Question</button>
        </div>
    )
}

export default Quiz;