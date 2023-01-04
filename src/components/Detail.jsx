// import { useState } from 'react'
import '../style/contentSell.css'
import { Link } from 'react-router-dom'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

function Detail(props) {

  return (
    <div className="content-sell">
      <h1>Details of Real Estate</h1>
      <div className="select-flex">
        <div className="flex">
          <label>
            Area (m<sup>2</sup>)
          </label>
          <br />
          <input type="number" name="area" value={props.area} onChange={props.handleInput} className="sell-btn" />
        </div>
        <div className="flex">
          <label>Total Number of Rooms</label>
          <br />
          <input type="number" name="rooms" value={props.rooms} onChange={props.handleInput} className="sell-btn" />
        </div>
      </div>
      <div className="select-flex">
        <div className="flex">
          <label>Bedroom</label>
          <br />
          <input type="number" name="bedrooms" value={props.bedrooms} onChange={props.handleInput} className="sell-btn" />
        </div>
        <div className="flex">
          <label>Bathroom/Toilet</label>
          <br />
          <input type="number" name="bathrooms" value={props.bathrooms} onChange={props.handleInput} className="sell-btn" />
        </div>
      </div>
      <h1>Real Estate Photo</h1>
      <div className="btn-Image">
        <CloudUploadIcon />
        <input type="file" name="images" onChange={props.onSelectFile} multiple accept="image/*" />
        <button onClick={props.submit}>Upload</button>
      </div>
      {/* <div className="images">
        {props.selectedImages &&
          props.selectedImages.map((image, index) => {
            return (
              <div key={image} className="picture">
                <img src={image} alt="upload" />
                <button onClick={()=>props.deleteHandler(image)}>Delete</button>
                <p>{index + 1}</p>
              </div>
            )
          })}
      </div> */}

      <div className="btnContainer">
        <Link className="btn" to="/sell/location">
          Back
        </Link>
        <Link className="btn" to="/sell/utilities">
          Next
        </Link>
      </div>
    </div>
  )
}

export default Detail
