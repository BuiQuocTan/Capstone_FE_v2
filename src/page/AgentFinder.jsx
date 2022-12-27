import '../style/agent.css'
import Agent from '../components/Agent'
import { useEffect, useState } from 'react'
import {db } from '../firebase'
import {collection,getDocs} from "firebase/firestore"

function AgentFinder() {

  const [agent, setAgent] = useState([])

  // const loadAgent = async () => {
  //   fetch('http://localhost:5000/api/listAgent', {
  //     method: 'get',
  //     headers: new Headers({
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //       'ngrok-skip-browser-warning': '69420',
  //     }),
  //   })
  //     .then(async (res) => {
  //       return res.json()
  //     })
  //     .then((receivedData) => setAgent(receivedData))
  // }

  const loadAgent = async () =>{
    await getDocs(collection(db, "listAgent"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setAgent(newData);                
            })
  }
  useEffect(() => {
    loadAgent()
  }, [])

  return (
    <div className="agent">
      <div className="agent-container">
        <h1>Agent Finder</h1>
        <div id="list-agent">
          {agent.map((agent) => {
            return (
              <Agent
                key={agent.id}
                name={agent.name}
                phone={agent.phone}
                mail={agent.mail}
                facebook={agent.facebook}
                consultingArea={agent.consultingArea}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AgentFinder
