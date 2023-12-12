import React, { useContext, useEffect, useRef } from "react";
import "./Body.css";
import { GetName } from "../../../../Utils/GetName";
import { UserContext } from "../../Auth";

function Body(props) {
  const User = useContext(UserContext);
  const ScrollRef = useRef();

  useEffect(() => {
    ScrollRef.current.scrollTop = ScrollRef.current.scrollHeight;
  }, [props.Chat]);

  return (
    <React.Fragment>
      <div className="Chat-body" ref={ScrollRef}>
        {props.Chat.map((messageBody) => (
          <div
            className={
              messageBody.Sender === User._id ? "card Right" : "card Left"
            }
            key={messageBody._id}
          >
            <div className="img-box">
              {messageBody.Logo ? (
                <img src={messageBody.User?.Logo} alt="logo" />
              ) : (
                GetName(messageBody.User?.FirstName, messageBody.User.LastName)
              )}
            </div>

            <h1>{messageBody.Message}</h1>
          </div>
        ))}
        {props.Typing && (
          <div className={"card Left"}>
            <div className="img-box">
              {props.UserInfo.Logo ? (
                <img src={props.UserInfo.Logo} alt="logo" />
              ) : (
                GetName(props.UserInfo.FirstName, props.UserInfo.LastName)
              )}
            </div>

            <div className="Typing">
              <div className="bullet"></div>
              <div className="bullet"></div>
              <div className="bullet"></div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Body;
