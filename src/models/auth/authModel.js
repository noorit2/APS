import { db, getprofile } from "../../utils/fire";
import { query, collection, where, getDocs } from "firebase/firestore";
import { Provider, auth, valiedemail } from "../../utils/fire";

import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


export async function signin() {
  Provider.addScope("email");
  Provider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    await signInWithPopup(auth, Provider);
    const email = auth.currentUser.providerData[0].email;
    await valiedemail(email);
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Sign in with Google.
 * @returns {Promise<firebase.auth.UserCredential>} - The user credential.
 */

export async function signInWithgGoogle(){
try{
await setPersistence(auth, browserLocalPersistence);
await signin();
if(getCurrentUser() === null){
    throw new Error("User Not Found");
  }
return getprofile();
}catch(e){
    throw new Error(e.message);
}
}

/**
 * Sign in a user with email and password.
 * @param {string} email - The user's email.
 * @param {string} password - User's password.
 * @returns {Promise<firebase.auth.UserCredential>} - The user credential object.
 */

export async function signinWithUsername(username,password) {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
 let email =!querySnapshot.empty
      ? querySnapshot.docs[0].data()
      : null;
      if (email !== null) {
     const a=await signInWithEmailAndPassword(auth,email,password);
     return getprofile();
      }else{
        throw new Error("User Not Found");
      }
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * Sign in with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<firebase.auth.UserCredential>} - The user credential.
 */

export const signInWithEmailPassword = async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth,email,password);
      return getprofile();
      }
    
    catch(e){
        throw new Error(e.message);
    }
  };

/**
 * Sign out the user.
 * @returns {Promise<void>}
 */
export const signOut = () => {
    return auth.signOut();
  };


/**
 * Get the current authenticated user.
 * @returns {firebase.User | null} - The current user or null if not authenticated.
 */
export const getCurrentUser = () => {
    return auth.currentUser;
  };

