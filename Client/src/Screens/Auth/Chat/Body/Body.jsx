import React, { useContext, useEffect, useState } from "react";
import "./Body.css";
import { GetName } from "../../../../Utils/GetName";
import { UserContext } from "../../Auth";
import { useParams } from "react-router-dom";
import Tost_Alert from "../../../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";

function Body() {
  const User = useContext(UserContext);
  const [Chat, SeChat] = useState([]);
  const Params = useParams();

  useEffect(() => {
    const GEtMessages = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Message/GetAllMessages`,
            { From: User._id, To: Params.id },
            {
              headers: {
                Authorization: User.Token,
              },
            }
          )
          .then((res) => {
            if (res.data.Status === "Faild") {
              Tost_Alert("error", res.data.message);
            } else {
              SeChat(res.data.data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    };
    GEtMessages();
  }, [Params.id, User]);

  return (
    <React.Fragment>
      <div className="Chat-body">
        {Chat.map((messageBody) => (
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
      </div>
    </React.Fragment>
  );
}
export default Body;
