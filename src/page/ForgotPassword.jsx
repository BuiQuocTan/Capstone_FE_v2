import React from 'react'
import { useContext,useRef } from 'react'
import { AccountContext } from '../components/accountContext'
import image from '../picture/anhLogin.jpg'
import '../style/forgotPassword.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const { switchToSignIn} = useContext(AccountContext)

  const emailRef = useRef(null);
  const auth = getAuth();
   const forgotPassword = (e) =>{
    e.preventDefault();

    sendPasswordResetEmail(auth, emailRef.current.value)
      .then(()=> alert("Password reset link sent!"))
      .catch((err)=> alert(err.message))
    }

  return (
    <div className="forgot-page">
      <div className="forgot-content">
        <h1>Forgot Password</h1>
        <p>Please enter the email you use to sign in</p>
        <form>
          <label>Your email</label>
          <br/>
          <input ref={emailRef} type="email" placeholder="Enter your email"></input>
        </form>
        <button className="btn-forgot" onClick={forgotPassword}>
          Reset password <ArrowRightIcon />
        </button>
        <p className="back" onClick={switchToSignIn}>Back to Sign in</p>
      </div>
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  )
}

export default ForgotPassword