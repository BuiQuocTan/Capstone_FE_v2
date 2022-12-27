import '../style/agent.css'
import { ListAgent } from '../listHome/ListAgent'
import Agent from '../components/Agent'

function AgentFinder() {
  return (
    <div className="agent">
      <div className="agent-container">
        <h1>Agent Finder</h1>
        <div id="list-agent">
          {ListAgent.map((agent) => {
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
