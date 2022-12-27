import React from 'react'
import '../style/contentSell.css'
import { Link } from 'react-router-dom'

function ContentSell({postTitle,postDescription,postPrice,postPriceRent,selectHome,selectBuy,handleInput}) {
  return (
    <div className="content-sell">
      <h1>General Information</h1>
      <label>Post title</label>
      <br />
      <input type="text" name="title" value={postTitle} onChange={handleInput} className="sell-btn" />
      <br />
      <label>Description/About the Real Estate you want to post</label>
      <br />
      <textarea rows="15 " cols="152" name="description" value={postDescription} onChange={handleInput} className="sell"/>
      <h1>Real estate price information</h1>
      <div className="select-flex">
        <div className="flex">
          <label>Enter price (only number) (ETH)</label>
          <br />
          <input type="number" name="price" value={postPrice} onChange={handleInput} className="sell-btn" />
        </div>
        {/* <div className="flex">
          <label>Enter price if renting ( price/month)</label>
          <br />
          <input type="number" name="priceRent" value={postPriceRent} onChange={handleInput} className="sell-btn" />
        </div> */}
      </div>
      <div className="select-flex">
        <div className="flex">
          <label>Type of real estate</label>
          <br />
          <select name="selectHome" onChange={handleInput} value={selectHome}>
            <option value=''>--Choose and option--</option>
            <option value='Home'>Home</option>
            <option value='Land'>Land</option>
          </select>
        </div>
        <div className="flex">
          {/* <label>Rent or Sell?</label> */}
          <br />
          <select name="selectBuy" onChange={handleInput} value={selectBuy}>
            <option value=''>--Choose and option--</option>
            <option value='Buy'>Buy</option>
          </select>
        </div>
      </div>
      <div className="btnContainer">
        <Link className="btn" to="/sell/location">
          Next
        </Link>
      </div>
    </div>
  )
}
export default ContentSell
