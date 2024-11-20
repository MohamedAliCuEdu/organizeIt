import React from "react";
import { Outlet } from "react-router";

import Navbar from "./nav/nav";
import Header from "./header/header";
import usePopupContext from "../hooks/usePopupContext";
import ErrMsgPopup from "../components/popups/errMsg.popup";
import ConfirmPopup from "../components/popups/confirm.popup";
import SuccessPopup from "../components/popups/success.popup";
import MsgSentPopup from "../components/popups/msgSent.popup";

function Layouts() {
  const { errMsg, successMsg, isMsgSent, confirmMsg } = usePopupContext();

  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      {errMsg && <ErrMsgPopup />}
      {successMsg && <SuccessPopup />}
      {isMsgSent && <MsgSentPopup />}
      {confirmMsg && <ConfirmPopup />}
    </>
  );
}

export default Layouts;
