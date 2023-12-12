import React, { useContext, useEffect, useCallback } from "react";
import "./Request.css";
import { UserContext, UserRequests } from "../Auth";
import { GetName } from "../../../Utils/GetName";
import Tost_Alert from "../../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

function Request(props) {
  const User = useContext(UserContext);
  const Requests = useContext(UserRequests);

  const GetRequests = useCallback(async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Request/GetAllRequests`,
          { _id: User._id },
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
            props.SetRequests(res.data.data);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  }, [User._id, User.Token]);

  const HandleDeleteRequest = useCallback(
    async (_id) => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Request/Delete`,
            { From: User._id, To: _id },
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
              GetRequests();
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    },
    [User._id, User.Token, GetRequests]
  );

  const HandleUpdateRequest = useCallback(
    async (_id) => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Request/Update`,
            { From: User._id, To: _id },
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
              GetRequests();
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    },
    [User._id, User.Token]
  );

  useEffect(() => {
    GetRequests();
  }, [User._id, User.Token, GetRequests]);

  return (
    <React.Fragment>
      <div className="Request">
        <div className="head">
          <h1>
            <i className="fa-solid fa-user-group" />
            Friends Requests
          </h1>
        </div>
        <div className="content">
          {Requests.length > 0 ? (
            <div className="conatiner-cards">
              {Requests.map((Req) => (
                <div className="card" key={Req._id}>
                  <div className="img-box">
                    {UserContext.Logo ? (
                      <img src={User.Logo} alt="logo" />
                    ) : (
                      GetName(Req.User.FirstName, Req.User.LastName)
                    )}
                  </div>
                  <h5 className="name">
                    {Req.User.FirstName} {""}
                    {Req.User.LastName}
                  </h5>
                  <div className="actions">
                    <i
                      className="fa-solid fa-check"
                      onClick={() => HandleUpdateRequest(Req.From)}
                    />
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() => HandleDeleteRequest(Req.From)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-Requests">
              <div className="conatiner">
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={require(`../../../Image/FriendRequest.json`)}
                  className="Player"
                />
                <h1>There is no requests </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Request;
