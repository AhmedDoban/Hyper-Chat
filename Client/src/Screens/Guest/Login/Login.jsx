import React from "react";
import Tost_Alert from "./../../../Components/Tost_Alert/Tost_Alert";
import "./Login.css";
import { Link } from "react-router-dom";

function Login(props) {
  // Handle Call database api login Button
  const Handle_Login = () => {
    props.SetLogin((prv) => !prv);
    localStorage.setItem("Hyper_Chat_Login", true);
    Tost_Alert("wow", "error");
  };

  return (
    <React.Fragment>
      <div className="Login">
        <div className="container">
          <div className="card" data-aos="flip-up">
            <div className="header">
              <h1>
                <img src={require("../../../Image/icon.png")} alt="icon" />
                Hyper Chat
              </h1>
              <p>
                Welcome to the Hyper Chat. Please, provide login credential to
                proceed and have access to all our servicess
              </p>
            </div>
            <div className="input-box">
              <input
                type="search"
                name="email"
                placeholder="Email"
                id="email"
              />
              <label htmlFor="email">
                <i className="fa-solid fa-user" />
              </label>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="password"
                id="password"
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
    </React.Fragment>
  );
}

export default Login;
