import { useNavigate } from 'react-router-dom'

function Welcome() {
   const navigate = useNavigate()

   const handeClick = e => {
      navigate(e.target.value)
   }

   return (
      <div role="button-container">
         <button role="create-quiz" onClick={handeClick} value={'/create_quiz'}>Create Quiz</button>
         <button role="leaderboard" onClick={handeClick} value={'/leaderboard'}>Leaderboard</button>
      </div>
   )
}

export default Welcome