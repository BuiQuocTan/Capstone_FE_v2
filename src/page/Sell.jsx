import '../style/sell.css'
import ContentSell from '../components/ContentSell'
import Detail from '../components/Detail'
import Utilities from '../components/Utility'
import Location from '../components/Location'
import { useParams } from 'react-router-dom'
import SellIndicator from '../listHome/sellIndicator'
import { useState } from 'react'
import { listLandAction } from '../utils'
import { useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'
import * as IPFS from 'ipfs-core'

function Sell() {
  const wallet = useSelector(selectWallet)
  const { type } = useParams()
  const [post, setPost] = useState({
    title: '',
    description: '',
    price: 0,
    priceRent: 0,
    selectHome: '',
    selectBuy: '',
    address: '',
    wards: '',
    city: '',
    area: 0,
    rooms: 0,
    bedrooms: 0,
    bathrooms: 0,
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [checkbox, setCheckbox] = useState([])
  const path2 = post.title.replace(/[., ]+/g, '-').toLowerCase()
  //onChange input
  const handleInput = (e) => {
    e.persist()
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  //checkbox
  const handleCheckbox = (e) => {
    setCheckbox({ ...checkbox, [e.target.name]: e.target.checked })
  }

  //upload image
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    // FOR BUG IN CHROME
    event.target.value = ''
  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const sell = {
      information: {
        title: post.title,
        description: post.description,
        price: post.price,
        priceRent: post.priceRent,
        selectHome: post.selectHome,
        selectBuy: post.selectBuy,
        area: post.area,
        path: path2,
      },
      street: {
        address: post.address,
        wards: post.wards,
        city: post.city,
      },
      detail: {
        rooms: post.rooms,
        bedrooms: post.bedrooms,
        bathrooms: post.bathrooms,
        image: selectedImages,
      },
      utility: {
        Pool: checkbox.Pool ? '1' : '0',
        Garage: checkbox.Garage ? '1' : '0',
        Backyard: checkbox.Backyard ? '1' : '0',
        Playground: checkbox.Playground ? '1' : '0',
        Laundry: checkbox.Laundry ? '1' : '0',
        Gym: checkbox.Gym ? '1' : '0',
        RecreationRoom: checkbox.RecreationRoom ? '1' : '0',
        KitchenEquipment: checkbox.KitchenEquipment ? '1' : '0',
        SolarPower: checkbox.SolarPower ? '1' : '0',
        AirConditioning: checkbox.AirConditioning ? '1' : '0',
        Heater: checkbox.Heater ? '1' : '0',
        Ventilation: checkbox.Ventilation ? '1' : '0',
        WasherDryer: checkbox.WasherDryer ? '1' : '0',
        SmokeExtractor: checkbox.SmokeExtractor ? '1' : '0',
        Elevator: checkbox.Elevator ? '1' : '0',
        Wifi: checkbox.Wifi ? '1' : '0',
      },
    }
    
    const ipfs = await IPFS.create()
    const { path, cid } = await ipfs.add(JSON.stringify(sell))
    const tmp = await listLandAction(wallet, path, post.price)
    if(tmp == true) {
      try {
        const res = await fetch('http://localhost:5000/api/home', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'ngrok-skip-browser-warning': '69420',
          },
          body: JSON.stringify(sell),
        })
        const data = await res.json()

        if (!res.ok) {
          console.log(data.description)
          return
        }

        console.log(data)
        alert('Post successful!')
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="sell-post">
      <div className="sell-container">
        <SellIndicator />
        {type === 'content' && (
          <ContentSell
            postTitle={post.title}
            postDescription={post.description}
            postPrice={post.price}
            postPriceRent={post.priceRent}
            handleInput={handleInput}
            selectHome={post.selectHome}
            selectBuy={post.selectBuy}
          />
        )}
        {type === 'detail' && (
          <Detail
            handleInput={handleInput}
            area={post.area}
            rooms={post.rooms}
            bedRooms={post.bedrooms}
            bathRooms={post.bathrooms}
            selectedImages={selectedImages}
            onSelectFile={onSelectFile}
            deleteHandler={deleteHandler}
          />
        )}
        {type === 'location' && (
          <Location handleInput={handleInput} postAddress={post.address} postWards={post.wards} postCity={post.city} />
        )}
        {type === 'utilities' && <Utilities handleCheckbox={handleCheckbox} checkbox={checkbox} />}
        <button type="submit" onClick={handleSubmit} className="Summit">
          Summit
        </button>
      </div>
    </div>
  )
}

export default Sell
