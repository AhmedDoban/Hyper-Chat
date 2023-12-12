import React, { useContext, useEffect } from "react";
import "./ChatUserInfo.css";
import { useParams } from "react-router-dom";
import { GetName } from "../../../../Utils/GetName";
import axios from "axios";
import Tost_Alert from "../../../../Components/Tost_Alert/Tost_Alert";
import { UserContext } from "../../Auth";

function ChatUserInfo(props) {
  const Params = useParams();
  const User = useContext(UserContext);

  useEffect(() => {
    const GEtUSer = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Request/GetContacts/${Params.id}`,
            {},
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
              props.SetUSerInfo(res.data.Data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    };
    GEtUSer();
  }, [Params.id, User.Token]);

  return (
    <React.Fragment>
      <div className="ChatUserInfo">
        <div className="img-box">
          {props.UserInfo.Logo ? (
            <img src={props.UserInfo.User.Logo} alt="logo" />
          ) : (
            GetName(props.UserInfo.FirstName, props.UserInfo.LastName)
          )}
        </div>

        <h1>
          {props.UserInfo.FirstName} {""}
          {props.UserInfo.LastName}
        </h1>
      </div>
    </React.Fragment>
  );
}
export default ChatUserInfo;
