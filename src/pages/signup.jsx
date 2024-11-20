import React from "react";

import FormBtns from "../components/buttons/formBtns";
import SignIndex from "../components/sign";
import useSignupContext from "../hooks/useSignupContext";

function SignupPage() {
  const { allValid, isPending } = useSignupContext();
  return (
    <main className="signup-page">
      <div className="container">
        <div className="content">
          <h1 className="form-title">sign up</h1>
          <SignIndex.SignupForm>
            <FormBtns disabled={!allValid || isPending} submitValue="sign up" />
          </SignIndex.SignupForm>
          <SignIndex.AccountMsg />
        </div>
      </div>
    </main>
  );
}
export default SignupPage;
