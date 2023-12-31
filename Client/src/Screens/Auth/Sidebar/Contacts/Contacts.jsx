import React, { useState, useEffect, useCallback } from "react";
import "./Contacts.css";
import { NavLink } from "react-router-dom";
import { GetName } from "../../../../Utils/GetName";
import axios from "axios";
import Tost_Alert from "../../../../Components/Tost_Alert/Tost_Alert";

function Contacts(props) {
  const { _id, Token } = JSON.parse(localStorage.getItem("Hyper_Chat_Login"));
  const [Contacts, SetContacts] = useState([]);

  const GetContacts = useCallback(async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API}/Request/GetContacts`,
          { _id: _id },
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
            SetContacts(res.data.data);
            console.log(res.data.data);
          }
        });
    } catch (err) {
      Tost_Alert("error", "Sorry , Can't get your data !");
    }
  }, [_id, Token]);

  useEffect(() => {
    GetContacts();
  }, [_id, Token, GetContacts, props.Requests]);

  return (
    <React.Fragment>
      <div className="Contacts">
        {Contacts.filter((Contact) => {
          if (props.Search !== "") {
            return Contact.User.name
              .toLowerCase()
              .includes(props.Search.toLowerCase());
          } else {
            return Contact;
          }
        }).map((Contact) => (
          <NavLink
            className="box"
            to={`/Chat/${Contact.User._id}`}
            key={Contact.User._id}
          >
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
