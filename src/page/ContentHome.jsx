import '../style/contentHome.css'
import PageBuy from '../components/PageBuy'
import { useEffect, useState } from 'react'

function ContentHome() {
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      fetch('http://localhost:5000/api/home', {
        method: "get",
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "ngrok-skip-browser-warning": "69420",
        }),
      })
        .then(async (res) =>{
          return res.json()
        })
        .then((receivedData) => setData(receivedData))
    }
    loadData()
  }, [])

  return (
    <div>
      {data.map((home,index) => (
        <PageBuy
          key={index}
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
        />
      ))}
    </div>
  )
}

export default ContentHome
