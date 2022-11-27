import React from 'react'
import '../style/contentSell.css'
import { Link } from 'react-router-dom'

function Utility({ handleCheckbox, checkbox }) {
  return (
    <div class="content-sell">
      <h1>Amenities & Features</h1>
      <p className="utility-name">Exterior details</p>
      <form className="form">
        <div className="list-form">
          <input
            type="checkbox"
            name="Pool"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Pool === 1 ? true : false}
          />
          <label>Pool</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Garage"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Garage === 1 ? true : false}
          />
          <label>Garage</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Backyard"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Backyard === 1 ? true : false}
          />
          <label>Backyard</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Playground"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Playground === 1 ? true : false}
          />
          <label>Playground</label>
        </div>
      </form>
      <p className="utility-name">Interior Details</p>
      <form className="form">
        <div className="list-form">
          <input
            type="checkbox"
            name="Laundry"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Laundry === 1 ? true : false}
          />
          <label>Laundry</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Gym"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Gym === 1 ? true : false}
          />
          <label>Gym</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="RecreationRoom"
            onChange={handleCheckbox}
            defaultChecked={checkbox.RecreationRoom === 1 ? true : false}
          />
          <label>Recreation Room</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="KitchenEquipment"
            onChange={handleCheckbox}
            defaultChecked={checkbox.KitchenEquipment === 1 ? true : false}
          />
          <label>Kitchen Equipment</label>
        </div>
      </form>
      <p className="utility-name">Utilities</p>
      <form className="form">
        <div className="list-form">
          <input
            type="checkbox"
            name="SolarPower"
            onChange={handleCheckbox}
            defaultChecked={checkbox.SolarPower === 1 ? true : false}
          />
          <label>Solar power </label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="AirConditioning"
            onChange={handleCheckbox}
            defaultChecked={checkbox.AirConditioning === 1 ? true : false}
          />
          <label>Air Conditioning</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Heater"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Heater === 1 ? true : false}
          />
          <label>Heater</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Ventilation"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Vent === 1 ? true : false}
          />
          <label>Ventilation</label>
        </div>
      </form>
      <p className="utility-name">Other appliances</p>
      <form className="form">
        <div className="list-form">
          <input
            type="checkbox"
            name="WasherDryer"
            onChange={handleCheckbox}
            defaultChecked={checkbox.WasherDryer === 1 ? true : false}
          />
          <label>Washer - Dryer</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="SmokeExtractor"
            onChange={handleCheckbox}
            defaultChecked={checkbox.SmokeExtractor === 1 ? true : false}
          />
          <label>Smoke extractor</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Elevator"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Elevator === 1 ? true : false}
          />
          <label>Elevator</label>
        </div>
        <div className="list-form">
          <input
            type="checkbox"
            name="Wifi"
            onChange={handleCheckbox}
            defaultChecked={checkbox.Wifi === 1 ? true : false}
          />
          <label>Wifi - Internet</label>
        </div>
      </form>
      <div className="btn-Container">
        <Link className="btn" to="/sell/detail">
          Back
        </Link>
      </div>
    </div>
  )
}

export default Utility
