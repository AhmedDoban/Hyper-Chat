import React, { useState } from "react";
import Tost_Alert from "./../../../Components/Tost_Alert/Tost_Alert";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [User, SetUser] = useState({
    email: "",
    password: "",
  });
  const [SeePassword, SetSeePassword] = useState(false);
  // Handle Call database api login Button
  const Handle_Login = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Login`, {
          email: User.email,
          password: User.password,
        })
        .then((response) => {
          if (response.data.Status === "Faild") {
            Tost_Alert("error", response.data.message);
          } else {
            localStorage.setItem(
              "Hyper_Chat_Login",
              JSON.stringify(response.data.Data)
            );
            props.SetLogin((prv) => !prv);
          }
        });
    } catch (err) {
      Tost_Alert("error", "can't connect to the database");
    }
  };
  // Handle change the state
  const Handle_Input = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };

  return (
    <React.Fragment>
      <div className="Login">
        <div className="container">
          <div className="card">
            <div className="left">
              <img src={require("../../../Image/Guest.jpg")} alt="Guest" />
            </div>
            <div className="right">
              <div className="header">
                <h1>Login</h1>
              </div>
              <div className="input-box">
                <input
                  type="search"
                  name="email"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => Handle_Input(e)}
                  value={User.email}
                />
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope" />
                </label>
              </div>
              <div className="input-box">
                <label htmlFor="" onClick={() => SetSeePassword(!SeePassword)}>
                  {SeePassword ? (
                    <i className="fa-regular fa-eye-slash" />
                  ) : (
                    <i className="fa-regular fa-eye" />
                  )}
                </label>
                <input
                  type={SeePassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  id="password"
                  onChange={(e) => Handle_Input(e)}
                  value={User.password}
                />
                <label htmlFor="password">
                  <i className="fa-solid fa-lock" />
                </label>
              </div>
              <div className="input-button">
                <button onClick={() => Handle_Login()}>Login</button>
              </div>
              <p className="or-other-login">login in with</p>
              <div className="input-other-options">
                <i class="fa-brands fa-google" />
                <i class="fa-brands fa-facebook-f" />
                <i class="fa-brands fa-twitter" />
              </div>
              <Link to="register" className="Link_page">
                <p>don't have an account ?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
