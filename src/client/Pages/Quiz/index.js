import React, {useState, useEffect} from "react";
import {Question} from '../../components'

const Quiz = ({name,questions,score,setScore,setQuestions}) =>{
    const [answers, setAnswers] = useState();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setAnswers(
          questions &&
            shuffle([
              questions[current]?.correct_answer,
              ...questions[current]?.incorrect_answers,
            ])
        );
      }, [current, questions]);

    const shuffle = (answers) =>{
        return answers.sort(()=>Math.random() - 0.5)
    }

    return(
        <div>
            <h1>Quiz page</h1>
            {questions ? (
                <>
                <div style={{display:"flex"}, {justifyContent: "space-between"}}>
                    <span>{questions[current].category}</span>
                    <span className="dif">Difficulty: {questions[current].difficulty}</span>
                    <span className='score'>Score: {score}</span>
                </div>
                <Question 
                    currQues={current}
                    setCurrQues={setCurrent}
                    questions={questions}
                    options={answers}
                    correct={questions[current]?.correct_answer}
                    score={score}
                    setScore={setScore}
                    setQuestions={setQuestions} />
                </>
            ) : (
            <h1>Loading</h1>)}
        </div>
    )
}

export default Quiz;