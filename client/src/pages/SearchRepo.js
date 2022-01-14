import axios from 'axios'
import { useState, useContext } from 'react'
import Context from "../utils/Context"
import RepoList from '../components/RepoList'

function SearchRepo() {
   const { setRepoData } = useContext(Context)
   const [username, setUsername] = useState('')
   const [error, setError] = useState('')

   async function getRepoData(username) {
      try {
         const { data } = await axios.get(`https://api.github.com/users/${username}/repos`)
         setRepoData(data)
         setError('')
      } catch (err) {
         setError(err.response.data.message || err.message)
      }
   }


   function submitForm(event) {
      event.preventDefault()
      getRepoData(username)
      event.reset()
   }

   function handleChange(event) {
      const { value } = event.target
      setUsername(value)
   }

   return(
      <div className="w3-center w3-margin w3-padding-32">
         <form onSubmit={ submitForm }>
            <input type="text" name="user" placeholder="Enter github username" onChange={handleChange} className='w3-margin-right'/>
            <input className="w3-button w3-purple w3-round-xlarge" type="submit" value="Submit"/>
         </form>
         <h3>{error}</h3>
         <RepoList />
      </div>
   )
}

export default SearchRepo;