import { useNavigate } from 'react-router-dom'

function NavigateButton(props) {
   
   const navigate = useNavigate()

   const handeClick = () => {
      navigate(props.navigatePath)
   }
   
   return ( <button className="navigatebutton" onClick={handeClick}>{ props.buttonText }</button> )
} 

export default NavigateButton;