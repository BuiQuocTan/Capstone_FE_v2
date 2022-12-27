import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import '../style/loginPage.css'
import image from '../picture/anhLogin.jpg'
import { useContext,useRef } from 'react'
import { AccountContext } from '../components/accountContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const { switchToSignUp,switchToForgotPassword } = useContext(AccountContext)
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  
  const handleLogin =(e)=>{
    e.preventDefault();

    signInWithEmailAndPassword(auth,
      emailRef.current.value,
      passwordRef.current.value
      )
      .then(()=>alert("Login successful!!"))
      .catch((err)=> alert(err.message))
  }

 

  return (
    <div className="login-page">
      <div className="login-content">
        <h1>Log in</h1>
        <input
          type="email"
          placeholder="name@gmail.com"
          // value={email}
          ref={emailRef}
          className="form-login"  
        />
        <br />
        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
          className="form-login"
        />
        <br />
        <button className="btn-login" onClick={handleLogin}>
          Log in <ArrowRightIcon />
        </button>
          <p className="forgot" onClick={switchToForgotPassword}>Forgot your password ?</p>
        <p>
          Don't have an account?
          <button className="switch" onClick={switchToSignUp}>
            Sign up
          </button>
        </p>
      </div>
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  )
}

export default LoginPage
