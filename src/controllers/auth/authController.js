import { useDispatch, useSelector } from 'react-redux';
import { emailLogin, usernameLogin, googleLogin, logout } from '../../store/actions/authActions';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const signInWithEmail = (email, password) => {
    dispatch(emailLogin(email, password));
  };

  const signInWithUsername = (username, password) => {
    dispatch(usernameLogin(username, password));
  };

  const signInWithGoogle = () => {
    dispatch(googleLogin());
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    ...authState,
    signInWithEmail,
    signInWithUsername,
    signInWithGoogle,
    signOut,
  };
};
