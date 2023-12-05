import React, { createContext, useState } from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Auth.css";
import { Route, Routes } from "react-router-dom";
import Tost_Alert from "../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";
import Home from "./Home/Home.jsx";

export const UserContext = createContext();
function Auth(props) {
  const { _id, Token } = JSON.parse(localStorage.getItem("Hyper_Chat_Login"));
  const [User, SetUser] = useState({});

  useState(() => {
    const GEtUSer = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/Users/User/${_id}`,
            { Token },
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then((res) => {
            if (res.data.Status === "Faild") {
              console.log(res.data);
              Tost_Alert("error", res.data.message);
            } else {
              SetUser(res.data.Data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
      }
    };
    GEtUSer();
  }, []);

  return (
    <UserContext.Provider value={User}>
      <div className="Auth">
        <Sidebar SetLogin={props.SetLogin} />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/Chat/:id" />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}
export default Auth;
