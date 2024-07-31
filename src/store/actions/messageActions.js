import { messageSlice } from "../reducers/message-slice";


export const displayMessage = (message, type) => {
  return (dispatch) => {
    dispatch(messageSlice.actions.setMessage({ messageContent: message, severity: type }));
  };
};
