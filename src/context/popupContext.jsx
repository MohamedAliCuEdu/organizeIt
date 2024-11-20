import React, { useState, createContext } from "react";
const PopupContext = createContext();

export function PopupProvider({ children }) {
  // for display any error msg:
  const [errMsg, setErrMsg] = useState("");
  // for display success msg:
  const [successMsg, setSuccessMsg] = useState("");
  // for display any confirm msg before action:
  const [confirmMsg, setConfirmMsg] = useState("");
  // action after success:
  const [successAction, setSuccessAction] = useState(null);
  // message sent state:
  const [isMsgSent, setIsMsgSent] = useState(false);
  // confirm action function state:
  const [confirmAction, setConfirmAction] = useState(null);
  // cancel action function state:
  const [cancelAction, setCancelAction] = useState(null);

  // handle successMsg and action after success:
  const handleSuccess = (msg, callBack) => {
    setSuccessMsg(msg);
    setSuccessAction(() => () => {
      closePopup();
      callBack && callBack();
    });
  };
  // handle errMsg update:
  const handleErrMsg = (msg) => {
    setErrMsg(msg);
  };
  // handle confirm msg update:
  const handleConfirmView = (msg, onAction, onCancel) => {
    // 1. update confirmMsg:
    setConfirmMsg(msg);
    // 2. update confirmAction:
    setConfirmAction(() => () => {
      closePopup();
      onAction && onAction();
    });
    // 3. update confirmAction:
    setCancelAction(() => () => {
      closePopup();
      onCancel && onCancel();
    });
  };
  // handle isMsgSent:
  const msgSentSuccess = () => {
    setIsMsgSent(true);
  };

  // handle close popup:
  const closePopup = () => {
    setErrMsg("");
    setSuccessMsg("");
    setIsMsgSent(false);
    setConfirmMsg("");
    setSuccessAction(null);
    setConfirmAction(null);
    setCancelAction(null);
  };

  return (
    <PopupContext.Provider
      value={{
        errMsg,
        handleErrMsg,
        successMsg,
        successAction,
        handleSuccess,
        isMsgSent,
        msgSentSuccess,
        confirmMsg,
        handleConfirmView,
        confirmAction,
        cancelAction,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}

export default PopupContext;
