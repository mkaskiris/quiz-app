import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
// import { Categories } from "../../components";
// import { Quiz } from "../../components";
import axios from "axios";

const GameCreation = ({name, setName, fetchQuestions }) =>{
    //have to maybe pass a prop to figure out if local or online game
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');

    const [categoryList, setCategoryList] = useState({});
    const [url, setURL] = useState('')
    const [create, setCreate] = useState(true)
    const [questions, setQuestions] = useState([])
    const [status, setStatus] = useState('Loading')
    const [timer, setTimer] = useState(10);

    const navigate = useNavigate();

    useEffect(()=>{
        fetchCategories();
    },[])

    const updateDifficulty = e =>{
        setDifficulty(e.target.value)
    }

    const updateCategory = e =>{
        setCategory(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        fetchQuestions(category, difficulty)
        navigate('../../quiz')
    }


    const fetchCategories = async () =>{
        setStatus('Loading')
        try{
            let {data} = await axios.get(`https://opentdb.com/api_category.php`)
            setCategoryList(data.trivia_categories);
            setStatus('');
        }catch(err){
            console.warn(err)
            setStatus(`There has been an issue ${err.message}`)
        }
    }

    return(
        <div className="container">
            <h1>This is the game creation page</h1>

            <form onSubmit={handleSubmit}>

                <label>Select difficulty</label>
                <select onChange={updateDifficulty}>
                    <option key='Any' value={'0'}>Any difficulty</option>
                    <option  value={'easy'}>Easy</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'hard'}>Hard</option>
                </select>

                <label>Select category</label>
                <select onChange={updateCategory}>
                    <option key={'Any'} value={''}>Any</option>
                    {status ? status: categoryList.map(category=> <option key={category.name} value={category.id}>{category.name}</option>)}
                </select>

                <input type='submit'/>
            </form>
        </div>
    )
}

export default GameCreation;