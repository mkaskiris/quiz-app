import NavigateButton from "../components/NavigateButton"

function Welcome() {

   return (
      <div className='welcome'>
         <NavigateButton navigatePath={'/create_quiz'}   buttonText ="Create Quiz"   />
         <NavigateButton navigatePath={'/leaderboard'} buttonText="Leaderboard"   />
      </div>
   )
}

export default Welcome