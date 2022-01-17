import React, {useEffect, useState} from "react";
import axios from "axios";


const Categories =  async() =>{
    //states
    const [categoryList, setCategoryList] = useState({});
    const [status, setStatus] = useState()

    useEffect(()=>{
        const fetchCategories = async () =>{
            //setStatus('Loading')
            try{
                let {data} = await axios.get(`https://opentdb.com/api_category.php`)
                setCategoryList(data.trivia_categories);
                setStatus('');
            }catch(err){
                console.warn(err)
                setStatus(`There has been an issue ${err.message}`)
            }
        }
        fetchCategories();
    }, [])

    useEffect(()=>{
        console.log(categoryList)
        console.log(status)
    }, [categoryList, status])
    
    return async (
        <select>
            <option> Hello</option>
        </select>
            /* {status ? status: categoryList.map(category=> <option key={category.id}>{category.name}</option>)} */
    )
    
}

export default Categories;