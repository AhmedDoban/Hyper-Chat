import React from "react";
import "./Actions.css";

function Actions(props) {
  return (
    <React.Fragment>
      <div className="chat-action">
        <input type="text" name="" id="" placeholder="message...." />
        <button>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
}
export default Actions;
