import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const RentModal = ({ closeModal, clickBtn, btnText }) => {
  const close = () => {
    closeModal(false)
  }

  const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
  }

  var date = new Date(Date.now())
  console.log(date)
  var current_date = date.getFullYear() + '-' + addLeadingZeros((date.getMonth() + 1), 2) + '-' + addLeadingZeros(date.getDate(), 2) + 'T' + '00:00:00'
  console.log(current_date)

  const [status, setStatus] = useState('new')
  const [startDate, setStartDate] = useState(new Date(current_date))
  current_date = date.getFullYear() + '-' + addLeadingZeros((date.getMonth() + 2), 2) + '-' + addLeadingZeros(date.getDate(), 2) + 'T' + '23:59:59'
  const [endDate, setEndDate] = useState(new Date(current_date))

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className="bg-modal-page">
      <div onClick={close} className="bg-modal"></div>
      <div
        style={{
          zIndex: '1000',
          backgroundColor: '#fff',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          width: '50rem',
          padding: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            fontSize: '18px',
            marginBottom: '15px',
          }}
        >
          <input
            type={'radio'}
            value="new"
            id="radio_rentNew"
            name="radio_rent"
            onChange={handleStatus}
            checked={status === 'new'}
          />{' '}
          New
        </div>
        {status === 'new' ? (
          <div
            style={{
              fontSize: '18px',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              marginBottom: '10px',
            }}
          >
            <span
              style={{
                whiteSpace: 'nowrap',
                marginRight: '10px',
              }}
            >
              Start Date
            </span>
            <DatePicker
              id="startdatepicker"
              selected={startDate}
              onChange={(date) => {
                var downDate = new Date(date)
                downDate.setHours(0)
                downDate.setMinutes(0)
                downDate.setSeconds(0)
                setStartDate(downDate)
              }}
            />
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <span
            style={{
              whiteSpace: 'nowrap',
              marginRight: '10px',
            }}
          >
            {status === 'new' ? 'End Date' : 'To Date'}
          </span>
          <DatePicker
            id="enddatepicker"
            selected={endDate}
            onChange={(date) => {
              var upDate = new Date(date)
              upDate.setHours(23)
              upDate.setMinutes(59)
              upDate.setSeconds(59)
              setEndDate(upDate)
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <button
            style={{
              fontSize: '20px',
              padding: '5px 20px',
              borderRadius: '5px',
              backgroundColor: '#AAA',
              color: 'white',
            }}
            onClick={() => {
              clickBtn(status, startDate / 1000, endDate / 1000)
            }}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RentModal
