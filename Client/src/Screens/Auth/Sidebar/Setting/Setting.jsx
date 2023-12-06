import React, { useContext } from "react";
import "./Setting.css";
import { UserContext } from "../../Auth";
import { GetName } from "../../../../Utils/GetName";
import { useNavigate } from "react-router-dom";

function Setting(props) {
  const User = useContext(UserContext);
  const Navigate = useNavigate();

  const Handle_Logout = () => {
    localStorage.clear();
    props.SetLogin((prv) => !prv);
    Navigate("/");
  };

  return (
    <React.Fragment>
      <div className="Setting">
        <div className="logo">
          <div className="img-box">
            {User.Logo ? (
              <img src={User.Logo} alt="logo" />
            ) : (
              GetName(User.FirstName, User.LastName)
            )}
          </div>

          <h5 className="name">
            {User.FirstName} {""}
            {User.LastName}
          </h5>
        </div>
        <i
          className="fa-solid fa-right-from-bracket Logout"
          onClick={() => Handle_Logout()}
        />
      </div>
    </React.Fragment>
  );
}
export default Setting;
