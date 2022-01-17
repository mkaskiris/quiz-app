import React from "react";
import axios from "axios";

const Categories = async () =>{
    try{
        const {data} = await fetchCategories();
        console.log(data.trivia_categories)
        return (data.trivia_categories.map(category => <option>{category}</option>))
    }catch(err){
        throw new Error(err.message)
    }
}

const fetchCategories = async () =>{
    try{
        const data = await axios.get(`https://opentdb.com/api_category.php`)
        return data;
    }catch(err){
        throw new Error(err.message)
    }
}

export default fetchCategories;