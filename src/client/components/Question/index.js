import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Question.css';

const Question = ({currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
    setQuestions
}) =>{

    const [ selected, setSelected] = useState()
    const [error, setError] = useState()

    const navigate = useNavigate()


    const handleSelect = (i) => {
        if (selected === i && selected === correct) return "select";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "select";
      };
    
      const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setError(false);
      };
    
      const handleNext = () => {
        if (currQues > 8) {
          navigate("/result");
        } else if (selected) {
          setCurrQues(currQues + 1);
          setSelected();
        } else setError("Please select an option first");
      };
    
      const handleQuit = () => {
        setCurrQues(0);
        setQuestions();
        navigate('../')
      };

    return(
        <div>
            <h1> {currQues + 1} / 10</h1>

            <div>
                <h2>{questions[currQues].question}</h2>
                <div className='answers'>
                    {options &&
                    options.map((i) => (
                        <button
                          className={`singleOption  ${selected && handleSelect(i)}`}
                          key={i}
                          onClick={() => handleCheck(i)}
                          disabled={selected}
                        >
                          {i}
                        </button>
                    ))}
                </div>
                <button onClick={handleNext}>Next</button>
                <button onClick={handleQuit}>Home</button>
            </div>
        </div>
    )
}

export default Question;