import React, { useContext, useEffect, useState } from "react";
import "./Request.css";
import { UserContext } from "../Auth";
import { GetName } from "../../../Utils/GetName";
import Tost_Alert from "../../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";

function Request() {
  const User = useContext(UserContext);
  const [Requests, SetRequests] = useState([]);

  useEffect(() => {
    const GetRequests = async () => {
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
              SetRequests(res.data.data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    };
    GetRequests();
  }, [User._id, User.Token]);

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
                  <i className="fa-solid fa-check" />
                  <i className="fa-solid fa-xmark" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Request;
