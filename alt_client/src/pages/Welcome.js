import { useNavigate } from 'react-router-dom'

function Welcome() {
   const navigate = useNavigate()

   const handeClick = e => {
      navigate(e.target.value)
   }

   return (
      <div>
         <button onClick={handeClick} value={'/create_quiz'}>Create Quiz</button>
         <button onClick={handeClick} value={'/leaderboard'}>Leaderboard</button>
      </div>
   )
}

export default Welcome