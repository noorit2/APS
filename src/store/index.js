import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import profileSlice from "./reducers/profile-slice";
import errorSlice from "./error-slice";
import notifySlice from "./reducers/notify-slice";
import Scheduleslice from "./reducers/Schedule-slice";
import messageSlice from "./message-slice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    error: errorSlice.reducer,
    notify: notifySlice.reducer,
    days: Scheduleslice.reducer,
    message:messageSlice.reducer,
  },
});
export default store;
