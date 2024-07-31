import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../utils/fire";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    accountType: null,
    uid: null,
  },
  reducers: {
    logIn(state, action) {
      const payload = action.payload;
      console.log(payload);
      state.loggedIn = true;
      state.accountType = payload.accountType;
      state.uid = payload.uid;
    },
    logOut(state) {
      state.loggedIn = false;
      state.accountType = null;
      state.uid = null;
    },
    changeAccountType(state, action){
      const accountType = action.payload.accountType;
      state.accountType = accountType;
    }
  },
});
export default authSlice;
export const authActions = authSlice.actions;
export const selectuid = (state) => state.auth.uid;