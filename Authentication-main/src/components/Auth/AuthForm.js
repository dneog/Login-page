import { useState, useRef , useContext} from 'react';
import AuthContext from '../../Store/AuthContext';
import classes from './AuthForm.module.css';
import {useHistory} from 'react-router-dom';

const AuthForm = () => {
  const navigate= useHistory();
 const authCtx= useContext(AuthContext);
  const emailInputRef= useRef();
  const passwordInputRef= useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading]= useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    const enteredEmail= emailInputRef.current.value;
    const enteredPassword= passwordInputRef.current.value;
    setLoading(true)
    let url;
    if(isLogin){
      url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcs8nLn2SZVKhB4JcRURQvIPdouSEVqgE'
    }else{
      url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcs8nLn2SZVKhB4JcRURQvIPdouSEVqgE' 
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then(res=> {
        setLoading(false)
        if(res.ok){
            return res.json()
        }else{
         return res.json().then(data=> {
           
            let errorMessage= 'Authentication Failed';
            
           
            throw new Error(errorMessage)

          })
        }
      })
          
          .then(data=> {
            authCtx.login(data.idToken);
            navigate.replace('/')
          }).catch(err=> {
            alert(err.message)
          })
        
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
        {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
        {loading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
