import React, {useState} from "react";

const JoinGame = () =>{

    const [lobbyId, setlobbyId] = useState();

    const updateInput = e => {
        const input = e.target.value;
        setlobbyId(input)
    }

    const handleSubmit = e =>{
        //redirects to pregame lobby
    }

    return(
        <>
            <h1>
                This is JoinGame
            </h1>
            <form onSubmit={handleSubmit}>
                <label>Enter lobby id</label>
                <input type='text' value={lobbyId} onChange={updateInput}></input>
                <input type='submit'></input>
            </form>
        </>


    )
}
export default JoinGame;