import '../style/modalPage.css'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ForgotPassword from './ForgotPassword'

import { useState} from 'react'
import { AccountContext } from '../components/accountContext'

function ModalPage({closeModal}) {
    const close= ()=>{
        closeModal(false)
    }
const[active,setActive] = useState("signIn")
const switchToSignUp = ()=>{
    setActive("signUp")
}

const switchToSignIn = ()=>{
    setActive("signIn")
}

const switchToForgotPassword = ()=>{
  setActive("forgotPassword")
}

const contextValue = {switchToSignUp,switchToSignIn,switchToForgotPassword}
  return (
    <AccountContext.Provider value={contextValue}>
    <div className="bg-modal-page">
      <div onClick={close} className="bg-modal"></div>
      {active === "signIn" && <LoginPage />}
      {active === "signUp" && <RegisterPage />}
      {active === "forgotPassword" && <ForgotPassword />}
    </div>
    </AccountContext.Provider>
  )
}

export default ModalPage
