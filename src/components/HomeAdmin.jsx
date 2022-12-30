import React from 'react'
import '../style/adminHome.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function HomeAdmin(props) {
  return (
    <div>
      <div className='dataHome'>
        <p>{props.id}</p>
        <p>{props.title}</p>
        <p>{props.type}</p>
        <img src={props.image} alt="" />
        <p>{props.price} &#272;</p>
        <DeleteForeverIcon onClick={()=>{props.deletePost(props.id)}} />
      </div>
    </div>
  )
}

export default HomeAdmin
