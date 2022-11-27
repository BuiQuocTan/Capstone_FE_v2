import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import '../style/loginPage.css'
import image from '../picture/anhLogin.jpg'
import { useContext,useRef } from 'react'
import { AccountContext } from '../components/accountContext'
import { auth } from '../firebase';


function LoginPage() {
  const { switchToSignUp } = useContext(AccountContext)
  
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  
  const handleLogin =(e)=>{
    e.preventDefault();

    auth.signInWithEmailAndPassword(
      emailRef.current.value,
      passwordRef.current.value
      )
      .then((authUser)=>{console.log(authUser)})
      .catch((err)=> alert(err.message))
  }

  const forgotPassword = () =>{
    const email = emailRef.current.value
    if(email){
      auth.sendPasswordResetEmail(email)
      .then(()=> (emailRef.current.value =""))
    }
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
        <p className="forgot" onClick={forgotPassword}>
          Forgot password?
        </p>
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
