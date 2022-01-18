import React, {useState, useEffect} from "react";

const Timer = () =>{
    const [ timer, setTimer ] = useState(10);

    useEffect(()=>{
        timer > 0 && setTimeout(()=> setTimer(time=>time-1),1000)
    },[timer])

    return(
        <span>{timer}</span>
    )
}

export default Timer;