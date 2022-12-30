import React from 'react'
import '../style/adminHome.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NavLink } from 'react-router-dom';

function HomeAdmin(props) {
  return (
    <div>
      <div className='dataHome'>
        <p>{props.title}</p>
        <p>{props.type}</p>
        <NavLink to={/buy/+props.path} target="_blank" rel="noreferrer"><img src={props.image} alt="" /></NavLink>
        <p>{props.price} &#272;</p>
        <DeleteForeverIcon onClick={()=>{props.deletePost(props.id)}} />
      </div>
    </div>
  )
}

export default HomeAdmin
