import React, { Suspense, createContext, useState, lazy } from "react";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./Auth.css";
import { Route, Routes } from "react-router-dom";
import Tost_Alert from "../../Components/Tost_Alert/Tost_Alert";
import axios from "axios";
import Loading from "./../../Components/Loading/Loading";
const Home = lazy(() => import("./Home/Home.jsx"));
const Create = lazy(() => import("./Create/Create.jsx"));
const Request = lazy(() => import("./Request/Request.jsx"));

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
              Tost_Alert("error", res.data.message);
            } else {
              SetUser(res.data.Data);
            }
          });
      } catch (err) {
        Tost_Alert("error", "Sorry , Can't get your data !");
        localStorage.clear();
        props.SetLogin((prv) => !prv);
      }
    };
    GEtUSer();
  }, []);

  return (
    <UserContext.Provider value={User}>
      <Suspense fallback={<Loading />}>
        <div className="Auth">
          <Sidebar SetLogin={props.SetLogin} />
          <div className="content">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/Chat/:id" />
              <Route path="/Create" element={<Create />} />
              <Route path="/Requests" element={<Request />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </UserContext.Provider>
  );
}
export default Auth;
