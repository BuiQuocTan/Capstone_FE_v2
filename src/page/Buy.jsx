import { useEffect, useState,useMemo } from 'react'
import '../style/buy.css'
import Map from '../components/Map'
import HomeItem from '../components/HomeItem'
import Paginate from 'react-paginate'


function Buy() {
  const [data, setData] = useState([])
  const [currentPage,setCurrentPage] = useState(0)
  const [postPerPage] = useState(4)

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
  useEffect(() => {
    loadData()
  }, [])

  const indexOfFirstPost = currentPage * postPerPage;
  const indexOfLastPost = indexOfFirstPost + postPerPage;
  const currentData = data.slice(indexOfFirstPost,indexOfLastPost);

  const pageCount = Math.ceil(data.length / postPerPage);
  const changePage= ({selected})=>{
    setCurrentPage(selected);
  };

  const [select, setSelect] = useState()

  const filterBuy = () => {
    if (!select) {
      return currentData
    } else if (select === 'Rent' || select === 'Buy') {
      return currentData.filter((item) => item.information.selectBuy === select)
    } else if (select === 'Home' || select === 'Land') {
      return currentData.filter((item) => item.information.selectHome === select)
    } else if (
      select === 'Hải Châu' ||
      select === 'Sơn Trà' ||
      select === 'Cẩm Lệ' ||
      select === 'Ngũ Hành Sơn' ||
      select === 'Thanh Khê' ||
      select === 'Liên Chiểu'
    ) {
      return currentData.filter((item) => item.street.wards === select)
    } else if (select === 'Đà Nẵng' || select === 'Hồ Chí Minh' || select === 'Hà Nội' || select === 'Huế') {
      return currentData.filter((item) => item.street.city === select)
    }
  }

  const filterBuyList = useMemo(filterBuy, [select, currentData])

  const updateSelect = (e) => {
    setSelect(e.target.value)
  }

  return (
    <div className="buy-content">
      <div className="searchBuy">
        <div className="selectBuy">
          <select name="Type" onChange={(e) => updateSelect(e)}>
            <option value="">Type</option>
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="Category" onChange={(e) => updateSelect(e)}>
            <option value="">Category</option>
            <option value="Home">Home</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="Wards"onChange={(e) => updateSelect(e)}>
          <option value="">Wards</option>
            <option value="Hải Châu">Hải Châu</option>
            <option value="Sơn Trà">Sơn Trà</option>
            <option value="Cẩm Lệ">Cẩm Lệ</option>
            <option value="Ngũ Hành Sơn">Ngũ Hành Sơn</option>
            <option value="Thanh Khê">Thanh Khê</option>
            <option value="Liên Chiểu">Liên Chiểu</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="City" onChange={(e) => updateSelect(e)}>
          <option value="">City</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Huế">Huế</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          </select>
        </div>
      </div>
      <div className="buy">
        <div className="buy-left">
          <Map />
        </div>
        <div className="buy-right">
          <div className="right-content">
            {filterBuyList.map((home,index) => {
              return (
                <HomeItem
                  key={index}
                  id={home.id}
                  title={home.information.title} 
                  price={home.information.price}
                  priceRent={home.information.priceRent}
                  address={home.street.address}
                  wards={home.street.wards}
                  city={home.street.city}
                  rooms={home.detail.rooms}
                  bedrooms={home.detail.bedrooms}
                  bathrooms={home.detail.bathrooms}
                  area={home.information.area}
                  image={home.detail.image[0]}
                  type={home.information.selectBuy}
                  path={home.information.path}
                />
              )
            })}
          </div>
          <Paginate 
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginationBtn"
          previousLinkClassName="previousBtn"
          nextLinkClassName="nextBtn"
          disabledClassName="paginationDisabled" 
          activeClassName="paginationActive" />
        </div>
      </div>
    </div>
  )
}

export default Buy
