import React, { useState } from "react";
import "./Sidebar.css";
import Contacts from "./Contacts/Contacts";
import Setting from "./Setting/Setting";
import { NavLink } from "react-router-dom";

function Sidebar(props) {
  const [Active, SetActive] = useState(false);
  const [Search, SetSearch] = useState("");

  return (
    <React.Fragment>
      <div className={Active ? "Sidebar active" : "Sidebar"}>
        {/**************************** Head section *********************************/}
        <div className="head">
          <div className="actions">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search..."
              value={Search}
              onChange={(e) => SetSearch(e.target.value)}
            />
          </div>
          <i
            className="fa-solid fa-bars MENUHandlear"
            onClick={() => SetActive((prev) => !prev)}
          />
          <NavLink to="/Create">
            <i className="fa-regular fa-pen-to-square " />
          </NavLink>
          <NavLink to="/Requests">
            <i className="fa-regular fa-bell" />
          </NavLink>
        </div>
        {/******************************End *******************************/}

        {/****************************** Contacts *******************************/}
        <Contacts Requests={props.Requests} Search={Search} />
        {/******************************End *******************************/}

        {/******************************** Setting *****************************/}
        <Setting SetLogin={props.SetLogin} />
        {/******************************End *******************************/}
      </div>
    </React.Fragment>
  );
}
export default Sidebar;
