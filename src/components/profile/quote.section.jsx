import React, { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { FaTrashAlt, FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import useProfileContext from "../../hooks/useProfileContext";
import usePopupContext from "../../hooks/usePopupContext";
import MESSAGES from "../../constants/messages";

function QuoteSection() {
  const { handleConfirmView } = usePopupContext();
  const { userData, updateQuoteApi, removeQuoteApi } = useProfileContext();

  const [quote, setQuote] = useState(userData?.quote || "");
  const [editQuoteView, setEditQuoteView] = useState(false);
  // handle new quote change:
  const handleQuote = (val) => {
    setQuote(val);
  };
  // handle quote edit view:
  const handleEditQuoteView = () => {
    setEditQuoteView(!editQuoteView);
  };

  return (
    <section className="profile-quote-section">
      {!editQuoteView ? (
        <div className="quote-content">
          <div className="quote-icon">
            <FaQuoteLeft />
          </div>
          <q>{userData?.quote || "your favourite quote."}</q>
          <div className="quote-btns">
            <button
              className="edit-quote-btn"
              onClick={handleEditQuoteView}
              title="edit quote"
            >
              <BiPencil />
            </button>
            <button
              className="delete-quote-btn"
              onClick={() =>
                handleConfirmView(MESSAGES.confirm.removeQuote, removeQuoteApi)
              }
              title="delete quote"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ) : (
        <form
          className="edit-quote-form"
          method="POST"
          onSubmit={(e) => updateQuoteApi(e, quote)}
        >
          <button
            className="back-to-quote-btn"
            onClick={handleEditQuoteView}
            title="back to quote"
          >
            <FaArrowLeft />
          </button>
          <div className="input-container">
            <input
              className="input-full-wd"
              name="user-quote"
              type="text"
              id="user-quote"
              value={quote}
              onChange={(e) => handleQuote(e.target.value)}
              maxLength="70"
              placeholder="my favourite quote"
              required
            />
            <div className="letters-count">{quote?.length || 0}/70</div>
          </div>
          <input
            className="md-btn blue-btn"
            type="submit"
            value="save"
            disabled={quote?.length <= 0 || quote === userData?.quote}
          />
        </form>
      )}
    </section>
  );
}

export default React.memo(QuoteSection);
