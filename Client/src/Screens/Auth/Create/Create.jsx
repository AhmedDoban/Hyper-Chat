import React, { useContext, useState } from "react";
import "./Create.css";
import { UserContext } from "../Auth";
import { GetName } from "../../../Utils/GetName";
import Tost_Alert from "../../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

function Create() {
  const User = useContext(UserContext);
  const [Creates, SetCreates] = useState([]);
  const [Search, SetSearch] = useState("");

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
            const NewCreates = [...Creates];
            const Find = NewCreates.find((Search) => Search._id === _id);
            const FindIndex = NewCreates.findIndex(
              (Search) => Search._id === _id
            );

            NewCreates[FindIndex] = {
              ...Find,
              If_User_Request: !Find.If_User_Request,
            };
            SetCreates(NewCreates);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  };

  const HandleDeleteRequest = async (_id) => {
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
            const NewCreates = [...Creates];
            const Find = NewCreates.find((Search) => Search._id === _id);
            const FindIndex = NewCreates.findIndex(
              (Search) => Search._id === _id
            );

            NewCreates[FindIndex] = {
              ...Find,
              If_User_Request: false,
              If_User_Requested_To: false,
              If_User_Friend: false,
            };
            SetCreates(NewCreates);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  };

  const HandleUpdateRequest = async (_id) => {
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
            const NewCreates = [...Creates];
            const Find = NewCreates.find((Search) => Search._id === _id);
            const FindIndex = NewCreates.findIndex(
              (Search) => Search._id === _id
            );

            NewCreates[FindIndex] = {
              ...Find,
              If_User_Friend: !Find.If_User_Friend,
            };
            SetCreates(NewCreates);
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
            SetCreates(res.data.data);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  };

  return (
    <React.Fragment>
      <div className="Create">
        <div className="Create-container">
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
            {Creates.length > 0 ? (
              <div className="conatiner-cards">
                {Creates.map((user) => (
                  <div className="card" key={user._id}>
                    <div className="left">
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
                    </div>

                    {user.If_User_Requested_To && !user.If_User_Friend && (
                      <div className="actions">
                        <i
                          className="fa-solid fa-check"
                          onClick={() => HandleUpdateRequest(user._id)}
                        />
                        <i
                          className="fa-solid fa-xmark"
                          onClick={() => HandleDeleteRequest(user._id)}
                        />
                      </div>
                    )}
                    {user.If_User_Request && !user.If_User_Friend && (
                      <div
                        className="deleteFriend"
                        onClick={() => HandleDeleteRequest(user._id)}
                      >
                        <i className="fa-solid fa-user-minus" />
                      </div>
                    )}
                    {user.If_User_Friend && (
                      <div
                        className="deleteFriend"
                        onClick={() => HandleDeleteRequest(user._id)}
                      >
                        <i className="fa-solid fa-user-minus" />
                      </div>
                    )}
                    {!user.If_User_Friend &&
                      !user.If_User_Requested_To &&
                      !user.If_User_Request && (
                        <div
                          className="AddFriend"
                          onClick={() => HandleAddRequest(user._id)}
                        >
                          <i className="fa-solid fa-user-plus" />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-creates">
                <div className="conatiner">
                  <Player
                    autoplay={true}
                    loop={true}
                    controls={false}
                    src={require(`../../../Image/looking.json`)}
                    className="Player"
                  />
                  <h1>Looking for new Friend !!</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Create;
