import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivateApi } from "../services/api";
import useAuth from "../hooks/useAuth";
import usePopupContext from "../hooks/usePopupContext";
import PageTitle from "../components/pageTitle";
import { FaGear } from "react-icons/fa6";
import UsernameSection from "../components/settings/username.section";
import PasswordSection from "../components/settings/password.section";

function Settings() {
  const { setAuth } = useAuth();
  const { handleErrMsg } = usePopupContext();
  const navigate = useNavigate();

  async function handleUserLogout() {
    try {
      await axiosPrivateApi.get("http://localhost:4000/auth/logout");
      setAuth(null);
    } catch (err) {
      console.log(err);
      handleErrMsg("failed to logout!");
    }
    navigate("/", { replace: true });
  }

  return (
    <main className="settings-page">
      <div className="container">
        <PageTitle title="settings">
          <FaGear />
        </PageTitle>
        <UsernameSection handleUserLogout={handleUserLogout} />
        <PasswordSection handleUserLogout={handleUserLogout} />
      </div>
    </main>
  );
}

export default Settings;
