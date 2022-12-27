import '../style/contentHome.css'
import { ethers } from 'ethers'
import PageBuy from '../components/PageBuy'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'
import { getList, fetchDataFromDatabase, getLandInfo, getUserBalance } from '../utils'

function ContentHome() {
  const wallet = useSelector(selectWallet)
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      var type = ''
      if (window.location.pathname.startsWith('/buy/')) {
        type = 'LandList'
      } else if (window.location.pathname.startsWith('/rent/')) {
        type = 'RentList'
      } else {
        type = 'AllList'
      }
      const src = await getList(wallet, type)
      const res = src.map((ss) => parseInt(ss.toString()))
      var temp = []
      for (var i = 0; i < res.length; i++) {
        const rent_price = await getLandInfo(wallet, res[i], type)
        const balance = await getUserBalance(wallet, res[i])

        const tmp = await fetchDataFromDatabase(res[i])
        var added = {}
        added = { ...tmp[0], blockchainData: rent_price, balance: balance }
        temp = [...temp, added]
      }
      setData(temp)
    }
    if (wallet) {
      loadData()
    }
  }, [wallet])

  return (
    <div>
      {data.map((home, index) => (
        <PageBuy
          fform={
            window.location.pathname.startsWith('/buy/')
              ? 'buy'
              : window.location.pathname.startsWith('/rent/')
              ? 'rent'
              : 'property'
          }
          key={index}
          nft_id={home.nft_id}
          path={home.information.path}
          title={home.information.title}
          type={home.information.selectBuy}
          kind={home.information.selectHome}
          city={home.street.city}
          ward={home.street.wards}
          address={home.street.address}
          image={home.detail.image}
          price={home.information.price}
          area={home.information.area}
          bedroom={home.detail.bedrooms}
          bathroom={home.detail.bathrooms}
          room={home.detail.rooms}
          description={home.information.description}
          pool={home.utility.Pool}
          garage={home.utility.Garage}
          backyard={home.utility.Backyard}
          playground={home.utility.Playground}
          laundry={home.utility.Laundry}
          gym={home.utility.Gym}
          recreation={home.utility.RecreationRoom}
          kitchen={home.utility.KitchenEquipment}
          solarPower={home.utility.SolarPower}
          airCondition={home.utility.AirConditioning}
          heater={home.utility.Heater}
          ventilation={home.utility.Ventilation}
          washer={home.utility.WasherDryer}
          smoke={home.utility.SmokeExtractor}
          elevator={home.utility.Elevator}
          wifi={home.utility.Wifi}
          feature={home.utility}
          blockchainData={home.blockchainData}
          balance={home.balance}
        />
      ))}
    </div>
  )
}

export default ContentHome
