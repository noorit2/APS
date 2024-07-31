import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithgGoogle, signOut, signinWithUsername } from "../../models/auth/authModel";
import { authSlice } from "../reducers/auth-slice";
import { onLogin } from "./profileActions";
import { profileActions } from "../reducers/profile-slice";

export const onLogout = ()=>{
    return async (dispatch)=>{
         signOut;
        dispatch(profileActions.logOut());
        dispatch(authSlice.actions.logOut());
    }
}

export const emailLogin = (email, password) => async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      onLogin(userCredential);
    } catch (error) {
    dispatch(errorActions.setError({title:"Login Failed",message:"Sorry, unable to login. Please know only registered accounts can login."}));
    }
  };
  
  export const usernameLogin = (username, password) => async (dispatch) => {
    try {
      const userCredential = await signinWithUsername(username, password);
      onLogin(userCredential);
    } catch (error) {
     dispatch(errorActions.setError({title:"Login Failed",message:"Sorry, unable to login. Please know only registered accounts can login."}));
    }
  };
  
  export const googleLogin = () => async (dispatch) => {
    try {
      const userCredential = await signInWithgGoogle();
      onLogin(userCredential);
    } catch (error) {
    dispatch(errorActions.setError({title:"Login Failed",message:"Sorry, unable to login. Please know only registered accounts can login."}));
    }
  };

