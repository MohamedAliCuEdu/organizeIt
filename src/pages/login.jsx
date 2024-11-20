import React from "react";
import FormBtns from "../components/buttons/formBtns";

import SignIndex from "../components/sign";
import useSignContext from "../hooks/useLoginContext";

function LoginPage() {
  const { allValid, isPending } = useSignContext();

  return (
    <main className="login-page center-page">
      <div className="container">
        <div className="content">
          <h1 className="form-title">log in</h1>
          <SignIndex.LoginForm>
            <SignIndex.PresistCheck />
            <FormBtns submitValue="log in" disabled={!allValid || isPending} />
          </SignIndex.LoginForm>
          <SignIndex.AccountMsg />
        </div>
      </div>
    </main>
  );
}
export default LoginPage;
