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
import { buyAction, listRentAction, rentAction, delayAction, claimReward, listLandAction } from '../utils'
import InputModal from './inputModal'
import RentModal from './rentModal'
import { ethers } from 'ethers'
import { ownerAddress } from '../config'

function PageBuy(props) {
  const wallet = useSelector(selectWallet)

  const { page } = useParams()
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [rentAddShow, setRentAddShow] = useState(false)
  const [rentShow, setRentShow] = useState(false)
  const length = props.image.length
  const nextImg = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevImg = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  const handleBuy = async (amount) => {
    const tx = await buyAction(wallet, props.nft_id, amount)
  }

  const handleAddRent = async (amount) => {
    const tx = await listRentAction(wallet, props.nft_id, amount)
  }

  const handleAdd = async (id) => {
    const tx = await listLandAction(wallet, id)
  }

  const handleRent = async (type, from, to) => {
    var tx
    // const initialPrice = ethers.utils.formatEther(props.blockchainData[1]);
    const initialPrice = parseInt(props.blockchainData[1].toString())
    if (type === 'new') {
      const period = (to - from) / 24 / 60 / 60
      const sendPrice = parseFloat(
        ethers.utils.formatEther(ethers.BigNumber.from(`${(Math.ceil(initialPrice / 30) * period).toFixed(0)}`)),
      )
      tx = await rentAction(wallet, props.nft_id, from, to, `${sendPrice.toFixed(17)}`)
    } 
  }

  const handleClaimReward = async (id) => {
    const tx = await claimReward(wallet, id)
  }

  return (
    <div className="pageBuy">
      {page === props.path && (
        <div className="page-left">
          <div className="topPage">
            <NavLink to={props.fform === 'buy' ? '/buy' : '/rent'}>{props.type}</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to={props.fform === 'buy' ? '/buy' : '/rent'}>{props.kind}</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to={props.fform === 'buy' ? '/buy' : '/rent'}>{props.city} City</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to={props.fform === 'buy' ? '/buy' : '/rent'}>{props.ward} Ward</NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to={props.fform === 'buy' ? '/buy' : '/rent'}>{props.address} Street</NavLink>
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
            <LocationOnIcon />
            <p>
              {props.address} Street,{props.ward} Ward,{props.city} City
            </p>
          </div>
          <h1>
            {props.price} ETH {/*&#272;*/} (
            {parseFloat((parseFloat(ethers.utils.formatEther(props.balance)) / parseFloat(props.price)) * 100).toFixed(
              2,
            )}
            % Owned
            {props.reward[0] == true ? `, Reward: ${parseFloat(ethers.utils.formatEther(props.reward[1]))} ETH` : ''})
          </h1>
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
                  {props.price} ETH {/*&#272;*/}
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
            {ownerAddress === wallet.account ? (
              <button
                className="btn-pageBuy"
                disabled={loading}
                onClick={() => {
                  handleAdd(props.nft_id)
                }}
              >
                List to sell
              </button>
            ) : (
              <></>
            )}
            {props.fform === 'property' && props.reward[0] === true ? (
              <button
                className="btn-pageBuy"
                disabled={loading}
                onClick={() => {
                  handleClaimReward(props.nft_id)
                }}
              >
                Claim Reward
              </button>
            ) : props.fform === 'property' &&
              props.reward[0] === false &&
              props.reward[1].toString() === '0' &&
              wallet.account !== ownerAddress ? (
              <button
                className="btn-pageBuy"
                disabled={loading}
                onClick={() => {
                  setRentAddShow(true)
                }}
              >
                List to rent Home
              </button>
            ) : props.fform === 'buy' ? (
              <button
                className="btn-pageBuy"
                disabled={loading}
                onClick={() => {
                  setModalShow(true)
                }}
              >
                Buy Home
              </button>
            ) : props.fform === 'rent' ? (
              <button
                className="btn-pageBuy"
                disabled={loading}
                onClick={() => {
                  setRentShow(true)
                }}
              >
                Rent
              </button>
            )  : (
              <></>
            ) }
            {modalShow && (
              <InputModal
                closeModal={setModalShow}
                clickBtn={handleBuy}
                btnText={'Buy'}
                additionalText={'You can buy part of the property'}
                limit={ethers.utils.formatEther(props.blockchainData[2])}
                percent={parseFloat((props.blockchainData[2] / props.blockchainData[1]) * 100).toFixed(2)}
              />
            )}
            {rentAddShow && (
              <InputModal
                closeModal={setRentAddShow}
                clickBtn={handleAddRent}
                btnText={'Add to rent list'}
                additionalText={''}
                limit={''}
              />
            )}
            {rentShow && <RentModal closeModal={setRentShow} clickBtn={handleRent} btnText={'Confirm'} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default PageBuy
