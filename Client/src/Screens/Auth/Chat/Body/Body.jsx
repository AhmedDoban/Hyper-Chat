import React, { useContext, useState } from "react";
import "./Body.css";
import { GetName } from "../../../../Utils/GetName";
import { UserContext } from "../../Auth";

function Body() {
  const User = useContext(UserContext);
  const [Chat, SeChat] = useState([]);

  return (
    <React.Fragment>
      <div className="Chat-body">
        {Chat.map((messageBody) => (
          <div
            className={messageBody.id === User._id ? "card Right" : "card Left"}
            key={messageBody.id}
          >
            <div className="img-box">
              {messageBody.Logo ? (
                <img src={messageBody.User.Logo} alt="logo" />
              ) : (
                GetName(messageBody.FirstName, messageBody.LastName)
              )}
            </div>

            <h1>{messageBody.message}</h1>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Body;
