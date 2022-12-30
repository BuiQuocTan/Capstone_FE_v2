import React from 'react'
import '../style/adminAgent.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function AgentAdmin(props) {
  return (
    <div>
      <div className='agentAdmin'>
        <p>{props.name}</p>
        <p>{props.phone}</p>
        <p>{props.email}</p>
        <p>{props.consultingArea}</p>
        <DeleteForeverIcon onClick={()=>{props.deletePost(props.id)}} />
      </div>
    </div>
  )
}

export default AgentAdmin
