import React, { useContext, useState, useEffect, useCallback } from "react";
import "./Contacts.css";
import { UserContext } from "../../Auth";
import { NavLink } from "react-router-dom";
import { GetName } from "../../../../Utils/GetName";
import axios from "axios";
import Tost_Alert from "../../../../Components/Tost_Alert/Tost_Alert";

function Contacts(props) {
  const User = useContext(UserContext);
  const [Contacts, SetContacts] = useState([]);

  const GetContacts = useCallback(async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Request/GetContacts`,
          { _id: User._id },
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
            SetContacts(res.data.data);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  }, [User._id, User.Token]);

  useEffect(() => {
    GetContacts();
  }, [User._id, User.Token, GetContacts, props.Requests]);

  return (
    <React.Fragment>
      <div className="Contacts">
        {Contacts.map((Contact) => (
          <NavLink className="box" to={Contact.User._id}>
            <div className="img-box">
              {Contact.Logo ? (
                <img src={Contact.Logo} alt="logo" />
              ) : (
                GetName(Contact.User.FirstName, Contact.User.LastName)
              )}
            </div>
            <h5 className="name">
              {Contact.User.FirstName} {""}
              {Contact.User.LastName}
            </h5>
          </NavLink>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Contacts;
