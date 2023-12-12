import React from "react";
import "./Actions.css";

function Actions(props) {
  return (
    <React.Fragment>
      <div className="chat-action">
        <input
          type="text"
          placeholder="message...."
          value={props.MessageInput}
          onChange={(e) => props.SetMEssageInput(e.target.value)}
        />
        <button onClick={() => props.HandleSendMessage()}>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
}
export default Actions;
