import React, { useState } from "react";
import "./Sidebar.css";
import Contacts from "./Contacts/Contacts";
import Setting from "./Setting/Setting";

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
          <i className="fa-regular fa-pen-to-square Create" />
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
