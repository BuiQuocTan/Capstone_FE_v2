import { useEffect, useState } from 'react'
import '../style/buy.css'
import Map from '../components/Map'
import HomeItem from '../components/HomeItem'
import Paginate from 'react-paginate'


function Buy() {
  const [data, setData] = useState([])
  const [currentPage,setCurrentPage] = useState(0)
  const [postPerPage] = useState(4)

  const deletePost = (id) =>{
    fetch(`'http://localhost:5000/api/home'${id}`, {
      method: 'DELETE',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "ngrok-skip-browser-warning": "69420",
      }),
    }).then((res) =>{
      res.json().then((resp) =>{
        alert("delete successful")
      })
      loadData();
    })
    .catch(err => {
      console.error(err)
    });
  }
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
  console.log(data)
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


  return (
    <div className="buy-content">
      <div className="searchBuy">
        <div className="selectBuy">
          <select name="Type">
            <option value="Type">Type</option>
            <option value="Rent">Rent</option>
            <option value="Buy">Buy</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="Category">
            <option value="Category">Category</option>
            <option value="Home">Home</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="Wards">
            <option value="Wards">Wards</option>
            <option value="Hai Chau">Hai Chau</option>
            <option value="Son Tra">Son Tra</option>
            <option value="Cam Le">Cam Le</option>
            <option value="Ngu Hanh Son">Ngu Hanh Son</option>
            <option value="Thanh Khe">Thanh Khe</option>
            <option value="Lien Chieu">Lien Chieu</option>
          </select>
        </div>
        <div className="selectBuy">
          <select name="City">
            <option value="City">City</option>
            <option value="Da Nang">Da Nang</option>
          </select>
        </div>
      </div>
      <div className="buy">
        <div className="buy-left">
          <Map />
        </div>
        <div className="buy-right">
          <div className="right-content">
            {currentData.map((home,index) => {
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
                  deletePost={deletePost}
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
