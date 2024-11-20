import React from "react";

function MsgForm({children, handleSubmit}) {
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <h4>
          Write your message here and let us know how we can help or what you'd
          like to share!
        </h4>
        {children}
      </form>
    </div>
  );
}

export default MsgForm;
