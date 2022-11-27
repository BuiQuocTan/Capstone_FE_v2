import React from 'react'
import Iframe from 'react-iframe'
import '../style/buy.css'

function Map() {
  return (
    <div className="map-content">
     <Iframe className="map" src="https://www.google.com/maps/d/u/0/embed?mid=1p9HSYa_KhKj0cCRUWTcDTmk0uLA1T4Q&ehbc=2E312F" ></Iframe>
    </div>
  )
}

export default Map
