import React, {useState, useEffect} from "react";
// import { Categories } from "../../components";
import { Quiz } from "../../components";
import axios from "axios";

const GameCreation = () =>{
    //have to maybe pass a prop to figure out if local or online game
    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState({});
    const [url, setURL] = useState('')
    const [create, setCreate] = useState(true)
    const [questions, setQuestions] = useState([])
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
        setCategory(e.target.value)
    }

    useEffect(()=>{
        console.log(difficulty)
        console.log(category)
    }, [difficulty, category])

    const handleSubmit = e =>{
        e.preventDefault()
        setURL(getURL())
        setCreate(false)
        //<Quiz />
        //console.log(e.target.value)
    }

    const getURL = () =>{
        let base = `https://opentdb.com/api.php?amount=10`
        if(difficulty){
            base = base + `&difficulty=${difficulty.toLowerCase()}`
        }
        if(category){
            base = base + `&category=${category}`
        }
        //console.log(base)
        return base;
    }

    const fetchQuestions = async () =>{
        setStatus('Loading')
        try{
            const url = getURL()
            console.log(url)
            let {data} = await axios.get(url)
            console.log(data.results)
            setQuestions(data.results)
            setStatus('')
        }catch (err){
            throw new Error(err.message)
        }
    }

    // useEffect(()=>{
    //     console.log('THese are the qs '+questions)
    // },[questions])

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
            {create ? <><h1>This is the game creation page</h1>
            <form onSubmit={handleSubmit}>
                <label>Select difficulty</label>
                <select onChange={updateDifficulty}>
                    <option key='Any' value={0}>Any difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
                <label>Select category</label>
                <select onChange={updateCategory}>
                    <option key={'Any'} value={0}>Any</option>
                    {status ? status: categoryList.map(category=> <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <input type='submit'/>
            </form>
            <h1>{timer ? timer : 'Time is up!'}</h1></> : <Quiz url={url}/>}
        </div>
    )
}

export default GameCreation;