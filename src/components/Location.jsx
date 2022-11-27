import React from 'react'
import '../style/contentSell.css'
import { Link } from 'react-router-dom'

function Location(props) {
  return (
    <div className="content-sell">
      <h1>Real estate address information</h1>
      <label>Address</label>
      <br />
      <input type="text" name="address" value={props.postAddress} onChange={props.handleInput} className="sell-btn" />
      <br />
      <div className="select-flex">
        <div className="flex">
          <label>Wards</label>
          <br />
          <input type="text" name="wards" value={props.postWards} onChange={props.handleInput} className="sell-btn" />
        </div>
        <div className="flex">
          <label>City</label>
          <br />
          <input type="text" name="city" value={props.postCity} onChange={props.handleInput} className="sell-btn" />
        </div>
      </div>
      <div className="btn-Container">
        <Link className="btn" to="/sell/content">
          Back
        </Link>
        <Link className="btn" to="/sell/detail">
          Next
        </Link>
      </div>
    </div>
  )
}

export default Location
