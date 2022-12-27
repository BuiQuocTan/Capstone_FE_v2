import CropFreeIcon from '@mui/icons-material/CropFree'
import BathtubIcon from '@mui/icons-material/Bathtub'
import BedIcon from '@mui/icons-material/Bed'
import { NavLink } from 'react-router-dom'

import '../style/homeItem.css'

function HomeItem(props) {
  return (
    <div className="homeBuy">
      <p className="type">{props.type}</p>
      {props.fform === 'buy' ? (
        <NavLink to={/buy/ + props.path}>
          <div className="img-buy" style={{ backgroundImage: `url(${props.image})` }}></div>
        </NavLink>
      ) : props.fform === 'rent' ? (
        <NavLink to={/rent/ + props.path}>
          <div className="img-buy" style={{ backgroundImage: `url(${props.image})` }}></div>
        </NavLink>
      ) : (
        <NavLink to={/property/ + props.path}>
          <div className="img-buy" style={{ backgroundImage: `url(${props.image})` }}></div>
        </NavLink>
      )}
      <div className="info-buy">
        <h1>{props.title}</h1>
        {props.price > props.priceRent ? <h1>{props.price} &#272;</h1> : <h1>{props.priceRent} &#272;</h1>}
        <p>
          {props.address} street , {props.wards} ward, {props.city}
        </p>
        <div className="item-rooms">
          {props.bathrooms !== 0 ? (
            <div className="rooms">
              <BedIcon />
              <p>{props.bathrooms}</p>
            </div>
          ) : (
            ''
          )}
          {props.bedrooms !== 0 ? (
            <div className="rooms">
              <BathtubIcon />
              <p>{props.bedrooms}</p>
            </div>
          ) : (
            ''
          )}
          {props.area !== 0 ? (
            <div className="rooms">
              <CropFreeIcon />
              <p>
                {props.area} m<sup>2</sup>
              </p>
            </div>
          ) : (
            ''
          )}
          {/* <button onClick={()=>{props.deletePost(props.id)}}>delete</button> */}
        </div>
      </div>
    </div>
  )
}

export default HomeItem
