import { useEffect, useReducer, useState } from "react";
import{auth} from "../../store/fire"
import classes from "./Login.module.css";
import googleicon from "../../Images/google.png"; 
import {  useNavigate } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import { useAuth } from "../../controllers/auth/authController";

const intilistate = {
    emailaddress: "",
    emailaddresstouched: false,
    password: "",
    passwordtouched: false,
  };
  function reducer(state, action) {
    let newstate = {};
  
    switch (action.type) {
      case "touch":
        newstate = { ...state, [action.value]: true };
        break;
      case "input":
        newstate = { ...state, [action.input]: action.value };
        break;
      default:
    }
    return newstate;
  }

const Login=()=>{
    const [loginstate,setloginstate]=useState(false);
    const { signInWithEmail, signInWithUsername, signInWithGoogle,isLoggedIn } = useAuth();
    const [state, dispatch] = useReducer(reducer, intilistate);
    const navigate=useNavigate();
    const inputsValid = {
        emailaddress: state.emailaddress.length > 0,
        password: state.password.length > 7,
    };
    const [loading,setLoading]=useState(false);

    function onChangeInput(e) {
        const action = {
          type: "input",
          input: e.target.name,
          value: e.target.value,
        };
        dispatch(action);
      }
      // set if input was touched.
      const blurHandler = (e) => {
        const action = {
          type: "touch",
          value: e.target.name + "touched",
        };
        dispatch(action);
    };
 

    const onSubmit=async (e)=>{ //emailAdress => state.emailaddress , password => state.password
      e.preventDefault(); 
       setLoading(true);       
      if (state.emailaddress.includes("@")){
        await signInWithEmail(state.emailaddress,state.password);
      }
    else{
        await signInWithUsername(state.emailaddress,state.password);
        }          
    if(isLoggedIn){
      setloginstate(true);
    }
    }
          
      
    const signInwithGoogle= async(e)=>{
      e.preventDefault();
      await signInWithGoogle();
      if(isLoggedIn){
        setloginstate(true);
      }
    }
    
   // check if user logged in successfully and route him to Main Page
   useEffect(()=>{
    if((auth.currentUser!==null)&& loginstate===true){  
    navigate("/")
    }
   },[loginstate])

if(loading){
  return <Loader/>
}
else{
    return (
        <div className={classes.container}>
        <form action="" className=" form">
          <h3>Login</h3>
          <label name="mailaddress" className="text">
            Username or Email<span className={classes.star}>*</span>
          </label>
          <input
            type="text"
            placeholder=""
            className="text"
            name="emailaddress"
            onChange={onChangeInput}
            onBlur={blurHandler}
            value={state.emailaddress}
          />
          {!inputsValid.emailaddress && state.emailaddresstouched && (
            <p className={classes.errorText}>Must not be empty!</p>
          )}
          <label className="text">
            Password<span className={classes.star}>*</span>
          </label>
          <input
            type="password"
            placeholder="more than 8 characters"
            className="text"
            name="password"
            onChange={onChangeInput}
            onBlur={blurHandler}
            value={state.password}
          />
         
          {!inputsValid.password && state.passwordtouched && (
            <p className={ classes.errorText}>Password must be longer than 7 characters!</p>
          )}
          <div className={classes.button}>
            {" "}
            <button onClick={onSubmit} disabled={!inputsValid.emailaddress || !inputsValid.password}>Confirm</button>
          </div>
          <div className={classes.or}>
            or
          </div>
          <div className={classes.googlebtn}>
           <button onClick={signInwithGoogle}>
            <img src={googleicon} alt="google icon"/><p>  Sign in with Google</p>
           </button>
          </div>
        </form>
        <div className={classes.bttmtext}>
          <p>Only registered accounts can login.</p>
        </div>
      </div>
    );
}}
export default Login;