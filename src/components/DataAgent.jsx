import { useState, useEffect,useCallback } from 'react'
import '../style/admin.css'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add';
import AgentAdmin from './AgentAdmin'
import Paginate from 'react-paginate'
import {db } from '../firebase'
import {collection,doc,getDocs , deleteDoc} from "firebase/firestore"

import Modal from '../page/ModalAgent'

function DataAgent() {
  const [modalAgent,setModalAgent] = useState(false)
  const [info, setInfo] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [postPerPage] = useState(3)

  const indexOfFirstPost = currentPage * postPerPage
  const indexOfLastPost = indexOfFirstPost + postPerPage
  const currentInfo = info.slice(indexOfFirstPost, indexOfLastPost)

  const pageCount = Math.ceil(info.length / postPerPage)
  const changePage = ({ selected }) => {
    setCurrentPage(selected)
  }
  
  useEffect(() => {
    if (modalAgent) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [modalAgent])

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && modalAgent) {
        setModalAgent(false)
      }
    },
    [setModalAgent, modalAgent],
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  })
  // const loadData = async () => {
  //   Promise.all([
  //     fetch('http://localhost:5000/api/listAgent', {
  //       method: 'get',
  //       headers: new Headers({
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //         'ngrok-skip-browser-warning': '69420',
  //       }),
  //     }),
  //     fetch('http://localhost:5000/api/home', {
  //       method: 'get',
  //       headers: new Headers({
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //         'ngrok-skip-browser-warning': '69420',
  //       }),
  //     })
  // ]).then(function (responses) {
  //     // Get a JSON object from each of the responses
  //     return Promise.all(responses.map(function (response) {
  //         return response.json();
  //     }));
  // }).then(function (data) {
  //     // Log the data to the console
  //     // You would do something with both sets of data here
  //     setInfo2(data)
  // }).catch(function (error) {
  //     // if there's an error, log it
  //     console.log(error);
  // });
  //}
  const loadData = async () =>{
    await getDocs(collection(db, "listAgent"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                  setInfo(newData);                
            })
  }
  
  useEffect(() => {
    loadData()
  }, [])

  const deletePost = async (id) => {
    const reference = doc(db, 'listAgent',id)
    await deleteDoc(reference)
    .then( alert("Delete Successfull"))
  }

  return (
    <div>
      <div className='admin-top'>
      <div className="searchAdmin">
        <input type="text" placeholder="Search..." name="search" />
        <SearchIcon />
      </div>
      <div className='add'><AddIcon onClick={()=>{setModalAgent(true)}}/></div>
      {modalAgent && <Modal closeModal={setModalAgent} />}
      </div>
      <div className="info-homeAdmin">
        <ul className="list-homeAdmin">
          <li>ID</li>
          <li>Name</li>
          <li>Phone</li>
          <li>Mail</li>
          <li>Consulting Area</li>
          <li>Action</li>
        </ul>
        <div>
          {currentInfo.map((agent, index) => {
            return (
              <AgentAdmin
                key={index}
                id={agent.id}
                name={agent.name}
                phone={agent.phone}
                email={agent.mail}
                consultingArea={agent.consultingArea}
                deletePost={deletePost}
              />
            )
          })}
        </div>
        <div className="paginationAdmin">
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

export default DataAgent