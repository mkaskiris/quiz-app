import React, {useState, useEffect} from "react";
//import { fetchCategories } from "../../components";
import axios from "axios";

const GameCreation = () =>{
    //have to maybe pass a prop to figure out if local or online game
    const [difficulty, setDifficulty] = useState('Any');
    const [category, setCategory] = useState('Any');
    const [catList, setCatList] = useState({});
    const [status, setStatus] = useState('Loading')
    const [timer, setTimer] = useState(10);

    useEffect(()=>{
        fetchCategories();
    },[])

    useEffect(()=>{
        timer > 0 && setTimeout(()=> setTimer(time=>time-1),1000)
    },[timer])

    const updateDifficulty = e =>{
        setDifficulty(e.target.value)
    }

    const updateCategory = e =>{
        setCategory(e.target.key)
    }

    useEffect(()=>{
        console.log(difficulty)
        console.log(category)
    }, [difficulty, category])

    const handleSubmit = e =>{
        e.preventDefault()
        //console.log(e.target.value)
    }

    const fetchCategories = async () =>{
        setStatus('Loading')
        try{
            let {data} = await axios.get(`https://opentdb.com/api_category.php`)
            setCatList(data.trivia_categories);
            setStatus('');
        }catch(err){
            console.warn(err)
            setStatus(`There has been an issue ${err.message}`)
        }
    }

    return(
        <div className="container">
            <h1>
                This is the game creation page
            </h1>
            <form onSubmit={handleSubmit}>
                <label>Select difficulty</label>
                <select onChange={updateDifficulty}>
                    <option value='Any'>Any difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
                <label>Select category</label>
                <select onChange={updateCategory}>
                    <option key={'Any'}>Any</option>
                    { status ? status: catList.map(cat=> <option key={cat.id}>{cat.name}</option>)}
                </select>
                <input type='submit' />
            </form>
            <h1>{timer ? timer : 'Time is up!'}</h1>

        </div>
    )
}

export default GameCreation;