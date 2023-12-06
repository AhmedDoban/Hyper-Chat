import React, { useState } from "react";
import "./Sidebar.css";
import Contacts from "./Contacts/Contacts";
import Setting from "./Setting/Setting";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const [Active, SetActive] = useState(false);

  return (
    <React.Fragment>
      <div className={Active ? "Sidebar active" : "Sidebar"}>
        <i
          className="fa-solid fa-bars MENUHandlear"
          onClick={() => SetActive((prev) => !prev)}
        />
        {/**************************** Head section *********************************/}
        <div className="head">
          <div className="logo">
            <img src={require("../../../Image/icon.png")} alt="icon" />
            <h1>Hyper Chat</h1>
          </div>
          <NavLink to="/Create">
            <i className="fa-regular fa-pen-to-square " />
          </NavLink>
          <NavLink to="/Requests">
            <i className="fa-regular fa-bell" />
          </NavLink>
        </div>
        {/******************************End *******************************/}

        {/****************************** Contacts *******************************/}
        <Contacts />
        {/******************************End *******************************/}

        {/******************************** Setting *****************************/}
        <Setting SetLogin={props.SetLogin} />
        {/******************************End *******************************/}
      </div>
    </React.Fragment>
  );
}
export default Sidebar;
