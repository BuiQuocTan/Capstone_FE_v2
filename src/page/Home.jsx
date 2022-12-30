import '../style/home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import MenuHomes from '../components/MenuHomes'
import { useEffect, useState } from 'react'
import { getList, fetchDataFromDatabase } from '../utils'
import { useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'


function Home() {
  const wallet = useSelector(selectWallet)
  const [data, setData] = useState([])

  // useEffect(() => {
  //   const loadData = async () => {
  //     fetch('http://localhost:5000/api/home', {
  //       method: "get",
  //       headers: new Headers({
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
  //         "ngrok-skip-browser-warning": "69420",
  //       }),
  //     })
  //       .then(async (res) =>{
  //         return res.json()
  //       })
  //       .then((receivedData) => setData(receivedData))
  //   }
  //   loadData()
  // }, [])

  useEffect(() => {
    async function func() {
      const src = await getList(wallet, 'LandList')
      const res = src.map((ss) => parseInt(ss.toString()))
      var temp = []
      for (var i = 0; i < res.length; i++) {
        const tmp = await fetchDataFromDatabase(res[i])
        temp = [...temp, tmp[0]]
      }
      setData(temp)
    }
    if (wallet) {
      func()
    }
  }, [wallet])


  const goToPrevious = () => {
    var slider = document.getElementById('select-home')
    slider.scrollLeft = slider.scrollLeft - 1000
  }

  const goToNext = () => {
    var slider = document.getElementById('select-home')
    slider.scrollLeft = slider.scrollLeft + 1000
  }

  return (
    <div className="home">
      <div className="search">
        <input type="text" className="btn-search" placeholder="Enter an address,city" />
        <FontAwesomeIcon className="icon-search" icon={faSearch} />
      </div>
      <div className="text-home">
        <p className="text-content">Home For You</p>
        <FontAwesomeIcon className="arrow-left" icon={faArrowAltCircleLeft} onClick={goToPrevious} />
        <div id="select-home">
          {data.map((homeItem) => {
            return (
              <MenuHomes
                key={homeItem.id}
                image={homeItem.detail.image}
                price={homeItem.information.price}
                room={homeItem.detail.rooms}
                bedroom={homeItem.detail.bedrooms}
                bathroom={homeItem.detail.bathrooms}
                area={homeItem.information.area}
                address={homeItem.street.address}
                city={homeItem.street.city}
                path={homeItem.information.path}
                priceRent={homeItem.information.priceRent}
              />
            )
          })}
        </div>
        <FontAwesomeIcon className="arrow-right" icon={faArrowAltCircleRight} onClick={goToNext} />
      </div>
      <div className="link-home">
        <div className="container-home">
          <div className="img-home"></div>
          <h1>Buy a homes</h1>
          <p>
            Find your place with an immersive photo experience and the most listings, including things you won’t find
            anywhere else.
          </p>
          <div className="link">
            <Link to="/buy">Browse homes</Link>
          </div>
        </div>
        <div className="container-home">
          <div className="img-home-2"></div>
          <h1>Sell a homes</h1>
          <p>No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
          <div className="link">
            <Link to="/sell/content">Post sell homes</Link>
          </div>
        </div>
      </div>
      <div className="img-footer"></div>
    </div>
  )
}

export default Home
