import { NavLink } from 'react-router-dom'

function MenuHomes(props) {
  return (
    <div className="homeItem">
      <NavLink to={/buy/+props.path}><div className="img" style={{ backgroundImage: `url(${props.image[0]})` }}></div></NavLink>
      <div className="info">
        {props.price === 0 ?(<h1>{props.priceRent} &#272;</h1>) :(<h1>{props.price} &#272;</h1>)}
        <p>{props.room} room | {props.bedroom} bedrooms | {props.bathroom} bathrooms</p>
        <p>{props.area} m<sup>2</sup></p>
        <p>{props.address} street,{props.city} city</p>
      </div>
    </div>
  )
}

export default MenuHomes
