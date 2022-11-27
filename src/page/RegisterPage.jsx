import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import '../style/registerPage.css'
import image from '../picture/anhLogin.jpg'
import { useContext ,useRef } from 'react'
import { AccountContext } from '../components/accountContext'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegisterPage() {
  const { switchToSignIn } = useContext(AccountContext)
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();

  const handleSignUp =(e)=>{
    e.preventDefault();

    createUserWithEmailAndPassword(auth,
      emailRef.current.value,
      passwordRef.current.value
      )
      .then(()=> alert("Register successful!!"))
      .catch((err)=> alert(err.message))
  }

  return (
    <div className="register-page">
      <div className="register-content">
        <h1>Sign up</h1>
        <br />
        <input
          type="email"
          placeholder="Create your email"
          className="form-register"
          ref={emailRef}
        />
        <br />
        <input
          type="password"
          placeholder="Create your password"
          className="form-register"
          ref={passwordRef}

        />
        <br />
        <button className="btn-register" onClick={handleSignUp}>
          Register Now <ArrowRightIcon />
        </button>
        <p>
          Already have an account?
          <button className="switch" onClick={switchToSignIn}>
            Sign In
          </button>
        </p>
      </div>
      <div className="image" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  )
}

export default RegisterPage
