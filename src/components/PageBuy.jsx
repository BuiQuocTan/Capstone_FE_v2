import { useState } from 'react'
import '../style/contentHome.css'
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ImgBuy from '../components/ImgBuy'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BathtubIcon from '@mui/icons-material/Bathtub'
import BedIcon from '@mui/icons-material/Bed'
import CropFreeIcon from '@mui/icons-material/CropFree'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import DoneIcon from '@mui/icons-material/Done'
import { useDispatch, useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'
import { buyAction, listRentAction } from '../utils'
import InputModal from './inputModal'

function PageBuy(props) {

  const wallet = useSelector(selectWallet)
  const dispatch = useDispatch()

  const { page } = useParams()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [rentShow, setRentShow] = useState(false)
  const length = props.image.length
  const nextImg = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevImg = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }
  
  const handleBuy = async (amount) => {
    const tx = await buyAction(wallet, amount)
  }

  const handleRent = async (amount) => {
    const tx = await listRentAction(wallet, 0, )
  }

  return (
    <div className="pageBuy">
      {page === props.path && (
        <div className="page-left">
          <div className="topPage">
            <NavLink to="/buy">{props.type}</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to="/buy">{props.kind}</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to="/buy">{props.city} City</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to="/buy">{props.ward} Ward</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to="/buy">{props.address} Street</NavLink>
          </div>
          <div className="imgTop">
            {props.image.map((img, index) => {
              return <div key={index}>{index === current && <ImgBuy img={img} />}</div>
            })}
            <ArrowBackIosNewIcon onClick={nextImg} className="btnNext-img" />
            <ArrowForwardIosIcon onClick={prevImg} className="btnPrev-img" />
          </div>
          <h1>{props.title}</h1>
          <div className="address-buy">
            <LocationOnIcon />{' '}
            <p>
              {props.address} Street,{props.ward} Ward,{props.city} City
            </p>
          </div>
          <h1>{props.price} &#272;</h1>
          <div className="room-page">
            <div className="detail-rooms">
              <div className="roomPage-item">
                <CropFreeIcon />
                <p>
                  {props.area} m<sup>2</sup>
                </p>
              </div>
              <p>Area</p>
            </div>
            <div className="detail-rooms">
              <div className="roomPage-item">
                <MeetingRoomIcon />
                <p>{props.room}</p>
              </div>
              <p>Rooms</p>
            </div>
            <div className="detail-rooms">
              <div className="roomPage-item">
                <BedIcon />
                <p>{props.bedroom}</p>
              </div>
              <p>Bedrooms</p>
            </div>
            <div className="detail-rooms">
              <div className="roomPage-item">
                <BathtubIcon />
                <p>{props.bathroom}</p>
              </div>
              <p>Bathrooms</p>
            </div>
          </div>
          <div className="introduce">
            <h1>Introduction</h1>
            <p className="page-description">{props.description}</p>
          </div>
          <div className="addressPage">
            <h1>Address</h1>
            <div class="pageAddress">
              <div className="addressChild">
                <p>
                  <strong>Address: </strong>
                  {props.address} street,
                  <br />
                  {props.ward} ward,
                  {props.city} city
                </p>
              </div>
              <div className="addressChild">
                <p>
                  <strong>City: </strong>
                  {props.city} city
                </p>
              </div>
              <div className="addressChild">
                <p>
                  <strong>Ward: </strong>
                  {props.ward} ward
                </p>
              </div>
            </div>
          </div>
          <div className="detailPage">
            <h1>Detail</h1>
            <div className="pageDetail">
              <div class="detailChild">
                <p>
                  <strong>Type: </strong>
                  {props.kind}
                </p>
              </div>
              <div class="detailChild">
                <p>
                  <strong>Price: </strong>
                  {props.price} &#272;
                </p>
              </div>
              <div class="detailChild">
                <p>
                  <strong>Area: </strong>
                  {props.area} m<sup>2</sup>
                </p>
              </div>
              <div class="detailChild">
                <p>
                  <strong>Rooms: </strong>
                  {props.room}
                </p>
              </div>
              <div class="detailChild">
                <p>
                  <strong>Bedrooms: </strong>
                  {props.bedroom}
                </p>
              </div>
              <div class="detailChild">
                <p>
                  <strong>Bathrooms: </strong>
                  {props.bathroom}
                </p>
              </div>
            </div>
          </div>
          <div class="featuredPage">
            <h1>Featured</h1>
            <p>
              <strong>Exterior details:</strong>
            </p>
            <div class="featuredChild">
              {props.pool === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Pool</p>
                </div>
              ) : (
                ''
              )}
              {props.garage === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Garage</p>
                </div>
              ) : (
                ''
              )}
              {props.backyard === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Backyard</p>
                </div>
              ) : (
                ''
              )}
              {props.playground === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Playground</p>
                </div>
              ) : (
                ''
              )}
            </div>
            <p>
              <strong>Interior Details:</strong>
            </p>
            <div class="featuredChild">
              {props.laundry === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Laundry</p>
                </div>
              ) : (
                ''
              )}
              {props.gym === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Gym</p>
                </div>
              ) : (
                ''
              )}
              {props.recreation === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Recreation Room</p>
                </div>
              ) : (
                ''
              )}
              {props.kitchen === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Kitchen Equipment</p>
                </div>
              ) : (
                ''
              )}
            </div>
            <p>
              <strong>Utilities:</strong>
            </p>
            <div class="featuredChild">
              {props.solarPower === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Solar power</p>
                </div>
              ) : (
                ''
              )}
              {props.airCondition === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Air Conditioning</p>
                </div>
              ) : (
                ''
              )}
              {props.heater === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Heater</p>
                </div>
              ) : (
                ''
              )}
              {props.ventilation === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Ventilation</p>
                </div>
              ) : (
                ''
              )}
            </div>
            <p>
              <strong>Other appliances:</strong>
            </p>
            <div class="featuredChild">
              {props.washer === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Washer - Dryer</p>
                </div>
              ) : (
                ''
              )}
              {props.smoke === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Smoke extractor</p>
                </div>
              ) : (
                ''
              )}
              {props.elevator === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Elevator</p>
                </div>
              ) : (
                ''
              )}
              {props.wifi === '1' ? (
                <div className="pageFeature">
                  <DoneIcon />
                  <p>Wifi - Internet</p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div class="btnPage">
            <button 
              className="btn-pageBuy"
              disabled={loading}
              onClick={() => {
                // setLoading(true)
                // handleRent()
                setRentShow(true)
              }}
            >
              List to rent Home
            </button>

            <button 
              className="btn-pageBuy"
              disabled={loading}
              onClick={() => {
                // setLoading(true)
                // handleBuy()
                setModalShow(true)
              }}
            >
              Buy Home
            </button>
            {
              modalShow && <InputModal 
                closeModal={setModalShow}
                clickBtn={handleBuy}
                btnText={'Buy'}
              />
            }
            {
              rentShow && <InputModal
                closeModal={setRentShow}
                clickBtn={handleRent}
                btnText={'Add to rent list'}
              />
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default PageBuy
