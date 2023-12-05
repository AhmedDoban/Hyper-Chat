import React, { useState } from "react";
import Tost_Alert from "./../../../Components/Tost_Alert/Tost_Alert";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const Navigate = useNavigate();
  const [User, SetUser] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
  });
  const [SeePassword, SetSeePassword] = useState(false);
  // Handle Call database api Register Button
  const Handle_Register = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API}/Users/Register`, {
          email: User.email,
          password: User.password,
          FirstName: User.FirstName,
          LastName: User.LastName,
        })
        .then((response) => {
          if (response.data.Status === "Faild") {
            Tost_Alert("error", response.data.message);
          } else {
            Tost_Alert("success", response.data.message);
            Navigate("/");
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
      <div className="Register">
        <div className="container">
          <div className="card">
            <div className="left">
              <img src={require("../../../Image/Register.jpg")} alt="Guest" />
            </div>
            <div className="right">
              <div className="header">
                <h1>Register</h1>
              </div>
              <div className="input-flex">
                <div className="input-box">
                  <input
                    type="search"
                    name="FirstName"
                    placeholder="First Name"
                    id="FirstName"
                    value={User.FirstName}
                    onChange={(e) => Handle_Input(e)}
                  />
                  <label htmlFor="FirstName">
                    <i className="fa-solid fa-user" />
                  </label>
                </div>
                <div className="input-box">
                  <input
                    type="search"
                    name="LastName"
                    placeholder="Last Name"
                    id="LastName"
                    value={User.LastName}
                    onChange={(e) => Handle_Input(e)}
                  />
                </div>
              </div>

              <div className="input-box">
                <input
                  type="search"
                  name="email"
                  placeholder="Email"
                  id="email"
                  value={User.email}
                  onChange={(e) => Handle_Input(e)}
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
                  value={User.password}
                  onChange={(e) => Handle_Input(e)}
                />
                <label htmlFor="password">
                  <i className="fa-solid fa-lock" />
                </label>
              </div>
              <div className="input-button">
                <button onClick={() => Handle_Register()}>Register</button>
              </div>
              <p className="or-other-Register">Register with</p>
              <div className="input-other-options">
                <i className="fa-brands fa-google" />
                <i className="fa-brands fa-facebook-f" />
                <i className="fa-brands fa-twitter" />
              </div>
              <Link to="/" className="Link_page">
                <p>have an account ?</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
