import React, { useContext, useState, useEffect } from "react";
import "./Contacts.css";
import { UserContext } from "../../Auth";
import { NavLink } from "react-router-dom";
import { GetName } from "../../../../Utils/GetName";

function Contacts() {
  const User = useContext(UserContext);
  const [Contacts, SetContacts] = useState([]);

  return (
    <React.Fragment>
      <div className="Contacts">
        {Contacts.map((Contact) => {
          <NavLink className="box" to={Contact._id}>
            <div className="img-box">
              {Contact.Logo ? (
                <img src={Contact.Logo} alt="logo" />
              ) : (
                GetName(Contact.FirstName, Contact.LastName)
              )}
            </div>
            <h5 className="name">
              {Contact.FirstName} {""}
              {Contact.FirstName}
            </h5>
          </NavLink>;
        })}
      </div>
    </React.Fragment>
  );
}

export default Contacts;
