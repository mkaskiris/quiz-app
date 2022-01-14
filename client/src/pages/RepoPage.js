import { useContext } from "react"
import { useParams } from "react-router-dom";
import Context from "../utils/Context"

function RepoPage() {
   const params = useParams();
   const { repoData } = useContext(Context)
   const data = repoData && repoData.find(e => e.name === params.name)

   return (
      <div className="w3-content w3-container w3-margin-top">
         { data ?
         <div class="w3-card-4 w3-container w3-pale-blue">
            <h1>{params.name}</h1>
            <h3>{data.description ? data.description : 'No description'}</h3>
            <h4>forks: {data.forks_count}</h4>
            <h4>stargazers: {data.stargazers}</h4>
            <h4>open issues: {data.open_issues_count}</h4>
            <h4>last update: {Date(data.updated_at)}</h4>
         </div> : <h1>Nothing Here</h1>
      }
      </div>
   )
}

export default RepoPage;