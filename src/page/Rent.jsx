import React, { useState, useEffect } from 'react'
// import '../style/rent.css'
import { useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'
import { fetchDataFromDatabase, getList } from '../utils'
import '../style/buy.css'
import Map from '../components/Map'
import HomeItem from '../components/HomeItem'
import Paginate from 'react-paginate'

const Rent = () => {
  const wallet = useSelector(selectWallet)
  const [rentData, setRentData] = useState([])

  const [currentPage, setCurrentPage] = useState(0)
  const [postPerPage] = useState(4)

  useEffect(() => {
    async function func() {
      const src = await getList(wallet, 'RentList')
      const res = src.map((ss) => parseInt(ss.toString()))
      var temp = []
      for (var i = 0; i < res.length; i++) {
        const tmp = await fetchDataFromDatabase(res[i])
        temp = [...temp, tmp[0]]
      }
      setRentData(temp)
    }
    if (wallet) {
      func()
    }
  }, [wallet])

  const indexOfFirstPost = currentPage * postPerPage
  const indexOfLastPost = indexOfFirstPost + postPerPage
  const currentData = rentData.slice(indexOfFirstPost, indexOfLastPost)

  const pageCount = Math.ceil(rentData.length / postPerPage)
  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="rent-content">
      <div className="buy">
        <div className="buy-left">
          <Map />
        </div>
        <div className="buy-right">
          <div className="right-content">
            {currentData.map((home, index) => {
              return (
                <HomeItem
                  fform={'rent'}
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
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBtn"
            previousLinkClassName="previousBtn"
            nextLinkClassName="nextBtn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    </div>
  )
}

export default Rent
