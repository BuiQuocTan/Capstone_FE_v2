import React from 'react'
import { NavLink } from 'react-router-dom'
import '../style/sellIndicator.css'

function sellIndicator() {
  const types = [
    {
      name: 'Content',
      path: '/sell/content',
    },
    {
      name: 'Location',
      path: '/sell/location',
    },
    {
      name: 'Details',
      path: '/sell/detail',
    },
    {
      name: 'Utilities',
      path: '/sell/utilities',
    },
  ]
  return (
    <div className="sellIndicator">
      <div className="connect">
        {types.map((type, index) => (
          <NavLink activeclassname="active" key={index} to={type.path}>
            {type.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default sellIndicator
