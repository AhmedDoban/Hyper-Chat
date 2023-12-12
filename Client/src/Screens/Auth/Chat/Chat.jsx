import React from "react";
import ChatUserInfo from "./ChatUserInfo/ChatUserInfo";
import Body from "./Body/Body";
import Actions from "./Actions/Actions";
import "./Chat.css";

function Chat(props) {
  return (
    <React.Fragment>
      <div className="chat">
        {/*  Chat Head  */}
        <ChatUserInfo Contacts={props.Contacts} />
        {/*  Chat body  */}
        <Body />
        {/*  Chat action  */}
        <Actions />
      </div>
    </React.Fragment>
  );
}
export default Chat;
