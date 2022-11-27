import '../style/navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../picture/anh1.jpg'
import { useState, useEffect, useCallback } from 'react'
import Modal from '../page/ModalPage'



function Navbar() {
  const [modalPage, setModalPage] = useState(false)

  useEffect(() => {
    if (modalPage) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [modalPage])

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && modalPage) {
        setModalPage(false)
      }
    },
    [setModalPage, modalPage],
  )

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  })

  return (
    <div>
      <div className="navbar">
        <div className="menu">
          <div className="menu-list">
            <Link to="./buy">Buy</Link>
            <Link to="./sell/content">Sell</Link>
            <Link to="./agent">Agent finder</Link>
            <Link to="./contact">Contact</Link>
          </div>
          <Link to="./">
            <img src={Logo} alt="logo" />
          </Link>
          <div>
            <button
              class="login"
              onClick={() => {
                setModalPage(true)
              }}
            >
              Login
            </button>
          </div>
        </div>
        {modalPage && <Modal closeModal={setModalPage} />}
      </div>
    </div>
  )
}

export default Navbar
