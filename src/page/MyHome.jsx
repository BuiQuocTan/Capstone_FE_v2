import React, { useEffect, useState } from 'react'
import '../style/buy.css'
import { useSelector } from 'react-redux'
import { selectWallet } from '../feature/walletSlice'
import Map from '../components/Map'
import HomeItem from '../components/HomeItem'
import Paginate from 'react-paginate'
import { getList, fetchDataFromDatabase, getListByUsers } from '../utils'
import { ownerAddress } from '../config'

const MyHome = () => {
  const wallet = useSelector(selectWallet)
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [postPerPage] = useState(4)

  useEffect(() => {
    async function func() {
      var src
      var rents = []
      if (wallet.account.toLowerCase() === ownerAddress.toLowerCase()) {
        src = await getList(wallet, 'AllList')
      } else {
        src = await getListByUsers(wallet, 'LandList')
        rents = await getListByUsers(wallet, 'RentList')
      }
      console.log(src)
      const res = src.map((ss) => parseInt(ss.toString()))
      var temp = []
      for (var i = 0; i < res.length; i++) {
        const tmp = await fetchDataFromDatabase(res[i])
        temp = [...temp, tmp[0]]
      }
      const rets = rents.map((rent) => parseInt(rent.toString()))
      for (var i = 0; i < rets.length; i++) {
        const tmp = await fetchDataFromDatabase(rets[i])
        temp = [...temp, tmp[0]]
      }
      console.log(temp)
      setData(temp)
    }
    if (wallet) {
      func()
    }
  }, [wallet])

  const indexOfFirstPost = currentPage * postPerPage
  const indexOfLastPost = indexOfFirstPost + postPerPage
  const currentData = data.slice(indexOfFirstPost, indexOfLastPost)

  const pageCount = Math.ceil(data.length / postPerPage)
  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="buy">
      <div className="buy-left">
        <Map />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '50%',
        }}
      >
        <div className="buy-right">
          <div className="right-content">
            {currentData.map((home, index) => {
              return (
                <HomeItem
                  fform={'property'}
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

export default MyHome
