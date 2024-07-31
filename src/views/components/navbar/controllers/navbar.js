// controllers/firebase/firebaseController.js
import { auth, getprofile, listnerq } from "../../store/fire";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { profileActions } from "../../store/profile-slice";
import { authActions, onLogin } from "../../store/auth-slice";
import { errorActions } from "../../store/error-slice";
import { notifyActions } from "../../store/notify-slice";

const useFirebaseController = () => {
  const dispatch = useDispatch();

  const handleAuthStateChanged = (location, uid, setLoading) => {
    onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            if (user.uid !== uid && uid === null && location.pathname !== "/Login") {
              const profile = await getprofile();
              dispatch(onLogin(profile));
            }
          } else {
            dispatch(profileActions.stopLoading());
          }
          setLoading(false);
        } catch (e) {
          dispatch(errorActions.setError({
            title: "Connection Failed",
            message: "Please try again!",
          }));
        }
      },
      []
    );
  };

  const subscribeToNotifications = (accountType, profile) => {
    const q = listnerq(accountType, profile.Department_id);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let notifications = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data()) {
          notifications.push({ ...doc.data(), id: doc.id });
        }
      });
      dispatch(notifyActions.setNotify(notifications));
      if (snapshot.docs.length === 0) {
        dispatch(notifyActions.setNotify("empty"));
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" && !change.doc.data().seen.includes(auth.currentUser.uid)) {
          dispatch(notifyActions.AddonNotify());
        }
      });
    });
    return unsubscribe;
  };

  return {
    handleAuthStateChanged,
    subscribeToNotifications,
  };
};

export default useFirebaseController;
