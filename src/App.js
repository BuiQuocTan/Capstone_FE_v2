import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { logout, login, selectUser, signup } from './feature/userSlice'

import './App.css'
import NavbarSecond from './components/NavbarSecond'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Buy from './page/Buy'
import Sell from './page/Sell'
import AgentFinder from './page/AgentFinder'
import Contact from './page/Contact'
import Footer from './components/footer'
import ContentHome from './page/ContentHome'
import Rent from './page/Rent'
import Admin from './page/AdminPage'

import WalletProvider from './provider/walletProvider'
import MyHome from './page/MyHome'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // const user = useSelector(state =>state.user)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //login user
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            password: userAuth.password,
          }),
        )
      } else {
        //logout
        dispatch(logout())
      }
      if (userAuth) {
        dispatch(
          signup({
            uid: userAuth.uid,
            email: userAuth.email,
            password: userAuth.password,
          }),
        )
      }
    })

    return unsubscribe
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {!user ? <NavbarSecond /> : <Navbar />}
        <Routes>
          {user?.email === 'ngocthuandn1998@gmail.com' ? (
            <Fragment>
              <Route path="/" element={<Admin />} />
              <Route path="/sell/:type" element={<Sell />} />
              <Route path="/agent" element={<AgentFinder />} />
              <Route path="/myhome/" element={<MyHome />} />
              <Route path="/property/:page" element={<ContentHome />} />
            </Fragment>
          ) : (
            <Fragment>
              <Route path="/" element={<Home />} />
              <Route path="/rent" element={<Rent />} />
              <Route path="/buy" element={<Buy />} />
              <Route path="/myhome/" element={<MyHome />} />
              <Route path="/sell/:type" element={<Sell />} />
              <Route path="/agent" element={<AgentFinder />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/buy/:page" element={<ContentHome />} />
              <Route path="/rent/:page" element={<ContentHome />} />
              <Route path="/property/:page" element={<ContentHome />} />
            </Fragment>
          )}
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
