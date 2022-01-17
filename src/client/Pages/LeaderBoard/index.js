import React from "react";

const LeaderBoard = () =>{
    //fetch list from db and create a list element for each entry
    const leaderboard = [
        {name: 'player 1', score: 100},
        {name: 'player 2', score: 90},
        {name: 'player 3', score: 80},
        {name: 'player 4', score: 70},
    ]

    //can go in components?
    const createLeaderboard = 
        leaderboard.map(player => {
        return <li style={{tabsize:4}}>{player.name} {player.score}pts</li>
        })

    return(
        <>
            <h1>
                This is the LeaderBoard
            </h1>
            <div className="leaderboard">
                <ol>
                    {createLeaderboard}
                </ol>
            </div>
        </>
    )
}

export default LeaderBoard;