import React, { useContext, useState } from "react";
import "./Actions.css";
import axios from "axios";
import Tost_Alert from "../../../../Components/Tost_Alert/Tost_Alert";
import { UserContext } from "../../Auth";
import { useParams } from "react-router-dom";

function Actions(props) {
  const [MessageInput, SetMEssageInput] = useState("");
  const User = useContext(UserContext);
  const Params = useParams();

  const HandleSendMessage = async () => {
    if (MessageInput !== "") {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Message/SendMessages`,
            {
              From: User._id,
              To: Params.id,
              Message: MessageInput,
            },
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
              SetMEssageInput("");
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="chat-action">
        <input
          type="text"
          name=""
          id=""
          placeholder="message...."
          value={MessageInput}
          onChange={(e) => SetMEssageInput(e.target.value)}
        />
        <button onClick={() => HandleSendMessage()}>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </React.Fragment>
  );
}
export default Actions;
