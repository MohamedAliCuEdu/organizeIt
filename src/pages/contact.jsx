import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import usePrivateAxios from "../hooks/usePrivateAxios";
import PageTitle from "../components/pageTitle";
import FormBtns from "../components/buttons/formBtns";
import { IoMdContacts } from "react-icons/io";
import usePopupContext from "../hooks/usePopupContext";
import ContactIndex from "../components/contact/contactIndex";

function Contact() {
  const { auth } = useAuth();
  const axiosPrivateApi = usePrivateAxios();
  const { handleErrMsg, msgSentSuccess } = usePopupContext();

  const [author, setAuthor] = useState(true);
  const [msg, setMsg] = useState("");

  // handle check if user want to identify himself:
  const handleAuthorInput = () => {
    setAuthor(!author);
  };
  // handle msg input shange:
  const handleMsgInput = (value) => {
    setMsg(value);
  };
  // handle send message:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // make post request:
      await axiosPrivateApi.post(`messages/${auth.userInfo.userId}`, {
        author,
        content: msg,
      });
      // view msg sent success popup:
      msgSentSuccess();
    } catch (err) {
      console.log(err);
      !err?.response
        ? handleErrMsg("server not response!")
        : handleErrMsg("failed to send the message!");
    }
  };

  return (
    <main className="contact-page">
      <div className="container">
        <PageTitle title="contact us">
          <IoMdContacts />
        </PageTitle>
        <div className="content">
          <ContactIndex.MsgForm handleSubmit={handleSubmit}>
            <ContactIndex.MsgTextarea
              msg={msg}
              handleMsgInput={handleMsgInput}
            />
            <ContactIndex.KnowMeCheckbox
              author={author}
              handleAuthorInput={handleAuthorInput}
            />
            <FormBtns submitValue="send" disabled={msg.length <= 0} />
          </ContactIndex.MsgForm>
        </div>
      </div>
    </main>
  );
}

export default Contact;
