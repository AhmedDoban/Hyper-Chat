import React, { useContext, useEffect, useState } from "react";
import "./Create.css";
import { UserContext } from "../Auth";
import { GetName } from "../../../Utils/GetName";
import Tost_Alert from "../../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";

function Create() {
  const User = useContext(UserContext);
  const [Creates, SetCreates] = useState([]);
  const [Search, SetSearch] = useState("");

  useEffect(() => {
    // const GetCreates = async () => {
    //   try {
    //     await axios
    //       .post(
    //         `${process.env.REACT_APP_API}/Create/GetAllCreates`,
    //         { _id: User._id },
    //         {
    //           headers: {
    //             Authorization: User.Token,
    //           },
    //         }
    //       )
    //       .then((res) => {
    //         if (res.data.Status === "Faild") {
    //           Tost_Alert("error", res.data.message);
    //         } else {
    //           console.log(res.data.Data);
    //           SetCreates(res.data.Data);
    //         }
    //       });
    //   } catch (err) {
    //     Tost_Alert("error", "Sorry , Can't get your data !");
    //   }
    // };
    // GetCreates();
  }, [User._id, User.Token]);

  const HandleAddRequest = async (_id) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Request/Create`,
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
            Tost_Alert("success", res.data.message);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  };

  const HandleSearch = async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Request/Search`,
          { UserName: Search, _id: User._id },
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
            console.log(res.data.data);
            // SetCreates("success", res.data.data);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  };
  return (
    <React.Fragment>
      <div className="Create">
        <div className="head">
          <h1>
            <i className="fa-solid fa-user-plus" />
            Add Friend
          </h1>
          <div className="input-box">
            <input
              type="search"
              placeholder="Enter an user name"
              value={Search}
              onChange={(e) => SetSearch(e.target.value)}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={HandleSearch}
            />
          </div>
        </div>
        <div className="content">
          <div className="conatiner-cards">
            {Creates.map((user) => (
              <div className="card">
                <div className="img-box">
                  {user.Logo ? (
                    <img src={user.Logo} alt="logo" />
                  ) : (
                    GetName(user.FirstName, user.LastName)
                  )}
                </div>
                <h5 className="name">
                  {user.FirstName} {""}
                  {user.LastName}
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
export default Create;
